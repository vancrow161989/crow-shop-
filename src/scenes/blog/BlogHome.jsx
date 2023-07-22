import { useState, useEffect, useRef } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import usePosts from "../../hooks/usePosts";
import PageTitle from "../../components/common/PageTitle";
import http from "../../services/httpServices";
import { baseUrl, blogsApiUrl } from "../../../config.json";
const apiEndPoint = `${baseUrl}/${blogsApiUrl}`;

function BlogHome() {
  const [allPosts, setAllPosts] = useState({});
  const [postUpdateId, setPostUpdateId] = useState(null);
  const [isOpenPostForm, setOpenPostForm] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [udpatedPost, setUdpatedPost] = useState(null);
  const currentUpdated = useRef(null);
  const options = `&sort[0]=createdAt%3Adesc&publicationState=live&pagination[page]=${1}&pagination[pageSize]=8`;
  const { postData, isError, isLoading, setPosts, fetchPosts } =
    usePosts(options);

  const getMorePosts = async () => {
    try {
      setPageIndex((prevIndex) => prevIndex + 1);
      const options = `&sort[0]=createdAt%3Adesc&publicationState=live&pagination[page]=${
        pageIndex + 1
      }&pagination[pageSize]=8`;
      const { data } = await http.get(`${apiEndPoint}${options}`);

      setAllPosts((prevPosts) => ({
        ...prevPosts,
        data: [...prevPosts.data, ...data?.data]
      }));
    } catch (err) {
      console.log("error", err);
    }
  };

  const updatePost = () => {
    fetchPosts();
  };

  const resetAllPost = () => {
    setAllPosts(postData);
  };

  const openUpdateForm = (postId) => {
    setOpenPostForm(true);
    setPostUpdateId(postId);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setAllPosts(postData);
    if (currentUpdated?.current)
      currentUpdated?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
  }, [postData]);

  if (isError)
    return (
      <div className="container">
        <p className="py-20 text-center text-3xl font-semibold">
          Sorry we are unable to load the data at this time.
        </p>
      </div>
    );

  return (
    <div className="blog-wrap">
      <PageTitle title="Latest Posts" />
      <div className="container">
        <div className="blog px-4 pt-16 md:px-0">
          {!isOpenPostForm && (
            <div className="container max-w-xl px-6 md:px-0">
              <button
                className="btn btn-primary btn-full"
                onClick={() => setOpenPostForm(true)}>
                Create Post
              </button>
            </div>
          )}
          {isOpenPostForm && (
            <PostForm
              postData={allPosts}
              setAllPosts={setAllPosts}
              resetAllPost={resetAllPost}
              postUpdateId={postUpdateId}
              setPostUpdateId={setPostUpdateId}
              setPageIndex={setPageIndex}
              setUdpatedPost={setUdpatedPost}
              udpatedPostSection
              onUpdatePost={updatePost}
            />
          )}
          <PostList
            isLoading={isLoading}
            posts={allPosts}
            setAllPosts={setAllPosts}
            pageTotal={allPosts?.meta?.pagination?.total}
            openUpdateForm={openUpdateForm}
            onUpdatePost={updatePost}
            udpatedPost={udpatedPost}
            setUdpatedPost={setUdpatedPost}
            getMorePosts={getMorePosts}
            ref={currentUpdated}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogHome;
