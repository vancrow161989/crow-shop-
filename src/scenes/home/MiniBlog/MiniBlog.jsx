import usePosts from "../../../hooks/usePosts";
import BlogList from "./BlogList";
import { Link } from "react-router-dom";

function MiniBlog() {
  const options = `&sort[0]=createdAt%3Adesc&publicationState=live&pagination[pageSize]=4`;
  const { postData, isError, isLoading, setPosts, fetchPosts } =
    usePosts(options);

  return (
    <section className="border-y border-gray-100 bg-gray-100 py-8 shadow-lg">
      <div className="container">
        <h2 className="mt-10 mb-10 text-center font-serif text-2xl md:text-4xl">
          Latest Posts
        </h2>

        <BlogList blog={postData} />
        <div className="mx-auto max-w-[1328px] text-center md:mb-7 md:text-right">
          <Link className="btn btn-primary" to="/blog">
            see more posts
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MiniBlog;
