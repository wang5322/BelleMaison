import React from "react";
import { useState } from "react";
import axios from "axios";
import UploadImage from "../components/UploadImage";
import GetImageTest from "../components/GetImageTest";

function TestPicture() {
  const [file, setFile] = useState();

  //   const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(); // FormData is needed to send multipart/formData
    formData.append("image", file);
    await axios.post("http://localhost:3005/api/pictures", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // navigate("/");
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input onChange={fileSelected} type="file" accept="image/*"></input>

        <button type="submit">Submit</button>
      </form>
      <UploadImage />
      <GetImageTest />
    </div>
  );
}

export default TestPicture;
