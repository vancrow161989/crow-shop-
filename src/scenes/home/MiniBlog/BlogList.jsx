import { formatDate, formatTime } from "../../../utils/helpers";
import { UserIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";

function BlogList({ blog }) {
  return (
    <ul className="mt-14 flex flex-wrap justify-between gap-3 px-4 md:mb-9 md:justify-center md:gap-1 md:px-0">
      {blog?.data?.map((post) => (
        <li className="mb-3 md:mb-6 md:w-[39%]" key={post?.id}>
          <div className="gap-4  md:flex">
            <div className="md:w-3/12">
              <img
                className="rounded-md"
                src={`${post?.attributes?.image?.data?.attributes?.url}`}
                alt={post?.attributes?.title}
              />
            </div>
            <div className="md:w-9/12">
              <h3 className=" mb-1 mt-4 text-md font-semibold md:mt-0">
                {post?.attributes?.title}
              </h3>
              <p className="post-meta mb-4 text-xs text-gray-400">
                <span className="post-author mr-4">
                  <UserIcon className="inline-block w-4 align-middle" />
                  <span className="ml-1 inline-block align-middle">
                    {post?.attributes?.user?.data?.attributes?.username}
                  </span>
                </span>
                <span className="post-date mr-4">
                  <CalendarIcon className="inline-block w-4 align-middle" />

                  <span className="ml-1 inline-block align-middle">
                    {formatDate(post?.attributes?.publishedAt)}
                  </span>
                </span>
                <span className="post-time mr-4">
                  <ClockIcon
                    className="inline-block w-4 align-middle"
                    fill="none"
                    stroke="currentColor"
                  />

                  <span className="ml-1 inline-block align-middle">
                    {formatTime(post?.attributes?.publishedAt)}
                  </span>
                </span>
              </p>
              <p>{post?.attributes?.content}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
