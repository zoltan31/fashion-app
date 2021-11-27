import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AppLayout from "../../components/AppLayout";
import Card from "../../components/Card";

type Cloth = {
  name: string;
  dateOfPurchase: string;
  style: string;
  type: string;
  image: string;
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

const UPDATE_URL = "http://localhost:8000/cloth/";

export default function ClothPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [cloth, setCloth] = useState<Cloth>({
    name: "",
    dateOfPurchase: "",
    style: "",
    type: "",
    image: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/cloth/${id}`)
      .then((res) => res.json())
      .then((res) =>
        setCloth({
          name: res.name,
          dateOfPurchase: res.date_of_purchase,
          style: res.style,
          type: res.type,
          image: res.image,
        })
      )
      .catch((err) => console.log(err));
  }, [setCloth, id]);

  const changeProp = (prop: keyof Cloth, value: string) => {
    setCloth({ ...cloth, [prop]: value });
  };

  const sendForm = () => {
    const formData = new FormData();
    formData.append("name", cloth.name);
    formData.append("date_of_purchase", cloth.dateOfPurchase);
    formData.append("style", cloth.style);
    formData.append("type", cloth.type);

    fetch(`${UPDATE_URL}${id}/`, {
      method: "PATCH",
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
    <AppLayout title="Wardrobe">
      <Card className="mt-4">
        {cloth && (
          <div className="grid grid-cols-2 gap-4">
            <img src={cloth.image} alt="some cloth" />
            <div>
              <form className="space-y-8 divide-y divide-gray-200 bg-white overflow-hidden rounded-lg mt-2 px-4 py-5 sm:p-6">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Update your cloth
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Please provide the date of purchase and style of your
                        cloth.
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
                            value={cloth.name}
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
                            value={cloth.dateOfPurchase}
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
                            value={cloth.style}
                            onChange={(e) =>
                              changeProp("style", e.target.value)
                            }
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
                            value={cloth.type}
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
            </div>
          </div>
        )}
      </Card>
    </AppLayout>
  );
}
