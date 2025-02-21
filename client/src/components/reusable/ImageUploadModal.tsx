import { Dispatch, SetStateAction, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import Spinner from "../spinner";
import axiosInstance from "../../utils/axiosConfig";
import Image from "./Image";

interface Props {
  setImages: Dispatch<SetStateAction<string[] | undefined>>;
  single?: boolean;
}

const ImageUploadModal = ({ setImages, single }: Props) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = () => {
    if (urls.length > 0) {
      setImages(urls);
    }
    setModalOpen(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (single && urls.length >= 1) {
      toast.error("Only one image can be uploaded.");
      return;
    }

    const formData = new FormData();
    formData.append("image", files[0]);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`/upload/`, formData);

      if (res.status === 200) {
        console.log(res)
        const url = res.data.path;
        setUrls((prev) => [...prev, url]);
        toast.success("Image uploaded successfully!");
      } else {
        const errorMessage = res.data?.error || "Something went wrong!";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      setError("Upload failed. Please try again.");
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setTimeout(() => setError(""), 4000);
    }
  };

  const deleteImage = async (imagePath: string) => {
    if (!imagePath) return false;

    try {
      await axiosInstance.post("/upload/delete", { filename: imagePath });
      return true;
    } catch {
      return false;
    }
  };

  const handleRemove = async (image: string) => {
    const updatedUrls = urls.filter((url) => url !== image);
    setUrls(updatedUrls);

    const success = await deleteImage(image);
    if (!success) {
      toast.error("Error deleting image! Please try again.");
      setUrls((prev) => [...prev, image]); // Revert back
    } else {
      toast.success("Image deleted successfully!");
    }
  };

  return (
    <>
      <span
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 cursor-pointer ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-w-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white"
      >
        Upload Image
      </span>

      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20 w-full flex justify-center items-center bg-black bg-opacity-60">
          <div className="w-10/12 md:w-6/12 min-h-96 bg-white p-5 rounded-lg relative flex flex-col justify-between">
            <span
              className="absolute cursor-pointer top-4 right-4 p-2 text-black bg-slate-100 rounded-md text-3xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              <IoMdClose />
            </span>

            <h1 className="text-2xl font-semibold mb-6">Upload an Image</h1>

            <div className="flex items-end gap-2 flex-wrap">
              {urls.map((image) => (
                <div className="h-40 w-40 relative" key={image}>
                  <div
                    onClick={() => handleRemove(image)}
                    className="absolute cursor-pointer z-50 -top-1 -right-1 text-xs rounded-full flex items-center justify-center p-1 bg-slate-300 text-slate-950"
                  >
                    <MdClose size="20" />
                  </div>
                  <Image
                    src={`/${image}`}
                    width={200}
                    height={200}
                    alt="Uploaded preview"
                    className="object-cover rounded-lg h-40 w-40"
                  />
                </div>
              ))}

              {!single || urls.length === 0 ? (
                <label className="p-4 rounded-md cursor-pointer bg-slate-500 text-3xl flex max-h-max text-white">
                  <FaCamera size="55" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              ) : null}

              {loading && (
                <p className="flex items-center gap-2">
                  Uploading Image <Spinner />
                </p>
              )}
            </div>

            {error && <p className="p-2 text-red-600 text-center">{error}</p>}

            <div className="flex justify-between gap-3 mt-10">
              <button
                className="flex items-center gap-1 text-white rounded-md px-5 py-2 transition ease-in-out bg-red-600"
                onClick={() => {
                  setModalOpen(false);
                  setUrls([]);
                  setImages([]);
                }}
              >
                Cancel
              </button>

              <button
                className="flex items-center gap-1 text-white rounded-md px-5 py-2 transition ease-in-out bg-green-600"
                onClick={handleSave}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadModal;
