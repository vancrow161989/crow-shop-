import { forwardRef, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/common/Loader";
import { deleteBlog } from "../../services/blogServices";
import { formatDate, formatTime } from "../../utils/helpers";

function PostListRef(
  {
    isLoading,
    posts,
    setAllPosts,
    pageTotal,
    openUpdateForm,
    onUpdatePost,
    udpatedPost,
    setUdpatedPost,
    getMorePosts
  },
  ref
) {
  const [hasMore, setHasMore] = useState(true);
  const currentUserId = useSelector((store) => store?.auth?.user?.id);

  useEffect(() => {
    setHasMore(pageTotal > posts?.data?.length ? true : false);
  }, [posts?.data]);

  const renderImage = (imgUrl, imgTitle) => {
    if (imgUrl)
      return (
        <img
          className="block h-auto w-full rounded-md"
          src={imgUrl}
          alt={imgTitle}
        />
      );
    return (
      <div className="rounded  border border-gray-200">
        {console.log("imgUrl", imgUrl)}
        <Loader loadingText="loading image..." />
      </div>
    );
  };

  const deleteBlogFromState = (postId) => {
    const updatedPosts = [...posts?.data].filter((post) => post.id !== postId);
    setAllPosts((prevPosts) => ({ ...prevPosts, data: updatedPosts }));
  };

  const handleDelete = async (postId) => {
    const originalPost = { ...posts };
    deleteBlogFromState(postId);
    try {
      await deleteBlog(postId);
      setUdpatedPost(null);
      onUpdatePost();
      toast.success("Successfully Deleted X", {
        position: "top-center",
        hideProgressBar: true
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        hideProgressBar: true
      });

      setAllPosts(originalPost);
    }
  };

  const handleUpdate = (postId) => {
    openUpdateForm(postId);
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="py-14">
      {posts?.data?.length > 0 && (
        <InfiniteScroll
          dataLength={posts?.data}
          next={getMorePosts}
          hasMore={hasMore}
          loader={<Loader loadingText="Loading Post..." />}
          endMessage={
            <p className="py-4 text-center">No more post to display</p>
          }>
          {posts?.data?.map((post) => (
            <div
              key={post.id}
              className="post container mb-10 max-w-3xl pb-2 sm:mb-6 sm:flex sm:gap-6 sm:pb-12"
              id={post.id}
              {...(udpatedPost === post.id && { ref })}>
              <div className="post-image sm:w-3/12">
                {renderImage(
                  post?.attributes?.image?.data?.attributes?.url,
                  post?.attributes?.title
                )}
              </div>
              <div className="post-body sm:w-9/12">
                <h3 className="post-title mb-1 mt-2 text-base font-semibold sm:mt-0">
                  {post?.attributes?.title}
                </h3>
                <p className="post-meta mb-2 text-xs text-gray-400">
                  <span className="post-author mr-4">
                    <UserIcon className="inline-block w-4 align-middle" />
                    <span className="ml-1 inline-block align-middle">
                      {post?.attributes?.user?.data?.attributes?.username
                        ? post?.attributes?.user?.data?.attributes?.username
                        : "Anonymous"}
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
                <div className="post-content mt-3 text-sm">
                  <p>{post?.attributes?.content} </p>
                </div>

                {currentUserId &&
                  post?.attributes?.user?.data?.id === currentUserId && (
                    <div className="post-actions flex gap-1">
                      <button
                        className="btn btn-primary h-auto py-2 text-sm"
                        onClick={() => handleUpdate(post.id)}>
                        Update
                      </button>

                      <button
                        className="btn btn-secondary h-auto py-2 text-sm"
                        onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
const PostList = forwardRef(PostListRef);

export default PostList;
