import { Link } from "react-router"; // make sure to use react-router-dom

export default function ProjectComp({ details }) {
  return (
    <ul className="grid gap-8 p-8 sm:p-6 xs:p-3 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {details.map((project) => (
        <li
          key={project.id || project.link}
          className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
        >
          <Link to={`/project/${project.id}`} className="block text-inherit no-underline">
            <h2 className="text-lg text-center mt-4 mb-2 px-2 sm:text-base sm:mt-2 xs:text-sm xs:mt-1">
              {project.title}
            </h2>
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-52 object-cover border-b border-gray-200 sm:h-40 xs:h-36"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
