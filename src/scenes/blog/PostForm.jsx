import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { selectCurrentUser } from "../../store/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewBlog,
  getPostById,
  updateSinglePost
} from "../../services/blogServices";
import { postFormSchema, postUpdateFormSchema } from "../../utils/formSchema";

function PostForm({
  postData,
  setAllPosts,
  resetAllPost,
  postUpdateId,
  setPostUpdateId,
  setUdpatedPost,
  setPageIndex,
  onUpdatePost
}) {
  const [updateData, setUpdateData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formOptions = updateData
    ? {
        resolver: zodResolver(postUpdateFormSchema)
      }
    : {
        resolver: zodResolver(postFormSchema)
      };

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm(formOptions);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (postUpdateId) {
      getPostData(postUpdateId);
    }

    setValue("title", updateData?.title);
    setValue("content", updateData?.content);
    return () => setPostUpdateId(null);
  }, [postUpdateId, updateData]);

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectfile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const getPostData = async (postUpdateId) => {
    try {
      const { data } = await getPostById(postUpdateId);
      setUpdateData(mapData(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const mapData = (data) => {
    return {
      id: data?.data?.id,
      title: data?.data?.attributes?.title,
      content: data?.data?.attributes?.content,
      image: data?.data?.attributes?.image?.data?.attributes?.url
    };
  };

  const onSubmit = async (formData) => {
    const currentTime = new Date().toISOString();
    const lastId = postData?.data[0]?.id ? postData?.data[0]?.id : 0 + 1;
    formData.publishedAt = currentTime;
    formData.user = {
      data: {
        id: currentUser?.id,
        attributes: { username: currentUser?.username }
      }
    };

    const newData = { id: lastId, attributes: { ...formData } };

    setAllPosts((prevPosts) => ({
      ...prevPosts,
      data: [newData, ...prevPosts.data]
    }));
    formData.user = currentUser?.id ? currentUser?.id : null;

    try {
      await addNewBlog(formData);
      setUdpatedPost(null);
      resetStateAndFields();
      resetAllPost();
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateSubmit = async (formData, postId) => {
    const originalPosts = [...postData.data];
    try {
      await updateSinglePost(formData, postId);
      setUdpatedPost(postId);
      resetStateAndFields();
    } catch (err) {
      console.log(err);
      toast.success(err.message, {
        position: "top-center",
        hideProgressBar: true
      });
      setAllPosts(originalPosts);
    }
  };

  const resetStateAndFields = () => {
    reset();
    onUpdatePost();
    setPageIndex(1);
    setUpdateData(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="add-post container  max-w-xl">
      <h2 className="text-center"> Add New Post </h2>
      {!currentUser && (
        <div className="mb-10 text-sm">
          <p className="mb-0">
            To update or delete your post, you should logged in first before
            adding a post.
          </p>
          <p>
            If you already have an account, you can{" "}
            <Link className="text-primary-500" to="/login">
              login here
            </Link>{" "}
            or you can
            <Link className="text-primary-500" to="/registration">
              {" "}
              register here
            </Link>
            .
          </p>
        </div>
      )}
      <form
        onSubmit={
          updateData
            ? handleSubmit((formdata) =>
                onUpdateSubmit(formdata, updateData.id)
              )
            : handleSubmit(onSubmit)
        }>
        <div className="field-group relative mb-6">
          <label htmlFor="title" className="field-label">
            Title
          </label>
          <div className="control">
            <input
              autoFocus
              className="h-12 w-full pl-3 pr-12 text-base text-gray-600"
              type="text"
              id="title"
              defaultValue={updateData ? updateData.title : ""}
              {...register("title")}
              placeholder="Enter Title"
            />
          </div>
          {errors.title && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="field-group relative mb-6">
          <label htmlFor="content" className="field-label">
            Short Description
          </label>
          <div className="control">
            <textarea
              rows="6"
              className="w-full pl-3 pr-12 text-base text-gray-600"
              id="content"
              maxLength={450}
              defaultValue={updateData ? updateData.content : ""}
              {...register("content")}
              placeholder="Enter Content"
            />
          </div>
          {errors.content && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="field-group relative mb-6">
          <label htmlFor="postImage" className="field-label">
            Upload Post Image
          </label>
          <div className="control overflow-hidden">
            {(imagePreview || updateData) && (
              <div className="imagePreview float-left mr-3 w-36 ">
                <img
                  src={imagePreview ? imagePreview : updateData.image}
                  alt={updateData?.title}
                />
              </div>
            )}
            <input
              className="float-left w-auto w-full pl-3 pr-12 text-base text-gray-600"
              type="file"
              id="postImage"
              {...register("postImage")}
              onChange={handleSelectfile}
            />
          </div>
        </div>
        {errors.postImage && (
          <p className="mt-2 bg-[#e74c3c] p-2  text-white">
            {errors.postImage.message}
          </p>
        )}
        <div className="input-group">
          <button type="submit" className="btn btn-primary btn-full">
            {updateData ? "Update Post" : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
