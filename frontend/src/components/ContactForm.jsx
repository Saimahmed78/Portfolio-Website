import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import apiClient from "../../services/apiClient.js";
import toast from "react-hot-toast";
// Validation schema
const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message cannot be empty"),
});

export function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await apiClient.contact(data);
            if (!res.ok) throw new Error(res.message || "Something went wrong.");
            toast.success(res?.data?.message || "Message Sent ✅");
            reset();
        } catch (err) {
            toast.error(err.message || "Error in Submitting Contact Form");
            console.error(err);
        }
    };

    const inputStyle = {
        background: "var(--bg-base)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-btn)",
        padding: "14px 18px",
        fontSize: "0.95rem",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        outline: "none",
        width: "100%",
        transition: "border-color 0.2s",
    };
    const labelStyle = {
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
    };
    const focusBorder = (e) => (e.target.style.borderColor = "var(--accent-primary)");
    const blurBorder = (e) => (e.target.style.borderColor = "var(--border-card)");

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "clamp(2rem, 5vw, 3.5rem)", display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={labelStyle}>Name</label>
                    <input type="text" placeholder="John Doe" {...register("name")} style={inputStyle} onFocus={focusBorder} onBlur={blurBorder} />
                    {errors.name && <div className="form-error" style={{ color: "var(--accent-danger)", fontSize: "0.8rem" }}>{errors.name.message}</div>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" placeholder="john@example.com" {...register("email")} style={inputStyle} onFocus={focusBorder} onBlur={blurBorder} />
                    {errors.email && <div className="form-error" style={{ color: "var(--accent-danger)", fontSize: "0.8rem" }}>{errors.email.message}</div>}
                </div>
            </div>

            {/* Subject */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={labelStyle}>Subject</label>
                <input type="text" placeholder="Project inquiry..." {...register("subject")} style={inputStyle} onFocus={focusBorder} onBlur={blurBorder} />
                {errors.subject && <div className="form-error" style={{ color: "var(--accent-danger)", fontSize: "0.8rem" }}>{errors.subject.message}</div>}
            </div>

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={labelStyle}>Message</label>
                <textarea rows={6} placeholder="Tell me about your project, goals, and timeline..." {...register("message")} style={{ ...inputStyle, resize: "vertical" }} onFocus={focusBorder} onBlur={blurBorder} />
                {errors.message && <div className="form-error" style={{ color: "var(--accent-danger)", fontSize: "0.8rem" }}>{errors.message.message}</div>}
            </div>

            {/* Feedback banner */}
            {isSubmitSuccessful && (
                <div style={{ padding: "12px 16px", borderRadius: "var(--radius-btn)", fontSize: "0.88rem", fontWeight: 500, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)", color: "var(--accent-success)" }}>
                    ✓ Message sent successfully!
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    background: isSubmitting ? "var(--text-muted)" : "var(--accent-primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-btn)",
                    padding: "16px 28px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    width: "100%",
                    boxShadow: "0 8px 28px var(--accent-glow-heavy)",
                    transition: "background 0.2s, transform 0.15s",
                    opacity: isSubmitting ? 0.65 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isSubmitting) {
                        e.currentTarget.style.background = "var(--accent-hover)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = isSubmitting ? "var(--text-muted)" : "var(--accent-primary)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
            >
                {isSubmitting ? "Sending…" : "Request a Free Consultation"}
            </button>
        </form>
    );
}
