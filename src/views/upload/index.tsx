import React, { useState } from "react";
import { useHistory } from "react-router";
import AppLayout from "../../components/AppLayout";

type Data = {
  name: string;
  dateOfPurchase: string;
  style: string;
  type: string;
};

const STYLES = [
  { text: "Retro", value: "retro" },
  { text: "Hypebeast", value: "hypebeast" },
  { text: "Goth", value: "goth" },
  { text: "Smart casual", value: "smart-casual" },
  { text: "Alt", value: "alt" },
  { text: "Vintage", value: "vintage" },
  { text: "Exotic", value: "exotic" },
  { text: "Bohemian", value: "bohemian" },
  { text: "Sporty", value: "sporty" },
  { text: "Military", value: "military" },
];

const TYPES = [
  { text: "Socks", value: "socks" },
  { text: "T-shirt", value: "t-shirt" },
  { text: "Hoodie", value: "hoodie" },
  { text: "Trousers", value: "trousers" },
  { text: "Shirt", value: "shirt" },
  { text: "Hat", value: "hat" },
  { text: "Pullover", value: "pullover" },
  { text: "Footwear", value: "footwear" },
  { text: "Accessory", value: "accessory" },
];

const UPLOAD_URL = "http://localhost:8000/cloth/";

const listFiles = (files: FileList) => {
  const arr = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    arr.push(<p>{file.name}</p>);
  }

  return arr;
};

export default function UploadPage() {
  const history = useHistory();
  const [files, setFiles] = useState<FileList | null>(null);
  const [data, setData] = useState<Data>({
    name: "",
    dateOfPurchase: "",
    style: "",
    type: "",
  });

  const changeProp = (prop: keyof Data, value: string) => {
    setData({ ...data, [prop]: value });
  };

  const sendForm = () => {
    const formData = new FormData();
    if (files) {
      formData.append("image", files[0]);
    }
    formData.append("name", data.name);
    formData.append("date_of_purchase", data.dateOfPurchase);
    formData.append("style", data.style);
    formData.append("type", data.type);

    fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          history.push("/wardrobe");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppLayout title="Upload">
      <form className="space-y-8 divide-y divide-gray-200 bg-white overflow-hidden shadow rounded-lg mt-2 px-4 py-5 sm:p-6">
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upload your clothes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please provide the date of purchase and style of your cloth.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={data.name}
                    onChange={(e) => changeProp("name", e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="purchase-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of purchase
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="purchase-date"
                    id="purchase-date"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={data.dateOfPurchase}
                    onChange={(e) =>
                      changeProp("dateOfPurchase", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="style"
                  className="block text-sm font-medium text-gray-700"
                >
                  Style
                </label>
                <div className="mt-1">
                  <select
                    id="style"
                    name="style"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={data.style}
                    onChange={(e) => changeProp("style", e.target.value)}
                  >
                    <option value="">------</option>
                    {STYLES.map((style) => (
                      <option key={style.value} value={style.value}>
                        {style.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={data.type}
                    onChange={(e) => changeProp("type", e.target.value)}
                  >
                    <option value="">------</option>
                    {TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:col-span-6 sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Photos
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {files ? (
                    <div className="max-w-lg px-6 pt-5 pb-6 rounded-md">
                      <p className="text-lg font-medium">Uploaded Files:</p>
                      {listFiles(files)}
                    </div>
                  ) : (
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept=".gif,.jpg,.png"
                              className="sr-only"
                              onChange={(e) => setFiles(e.target.files)}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={history.goBack}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={sendForm}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}
