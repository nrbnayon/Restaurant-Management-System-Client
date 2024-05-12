import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const Modal = ({ closeModal, feedbackImgUrl }) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [formData, setFormData] = useState({
    feedbackUserName: user?.displayName,
    feedback: "",
    feedbackImgUrl: feedbackImgUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/feedback", formData);
      toast.success("Feedback submitted successfully");
      closeModal();
    } catch (error) {
      toast.warn("Error submitting feedback");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              name="feedbackUserName"
              value={formData.feedbackUserName}
              className="w-full px-3 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="feedback"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Feedback or Experience Description
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Add your valuable feedback"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              name="feedbackImgUrl"
              value={formData.feedbackImgUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  feedbackImgUrl: PropTypes.string,
};
export default Modal;