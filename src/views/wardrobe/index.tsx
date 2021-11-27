import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppLayout from "../../components/AppLayout";
import Dropdown, { Action } from "../../components/Dropdown";

const DELETE_URL = "http://localhost:8000/cloth/";
const GET_URL = "http://localhost:8000/cloth/";

type Cloth = {
  id: number;
  name: string;
  image: string;
  style: string;
  type: string;
  selected: boolean;
};

export default function WardrobePage() {
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const history = useHistory();

  const changeChecked = useCallback(
    (id: number, newValue: boolean) => {
      setClothes((prevClothes) => {
        prevClothes[id].selected = newValue;
        return [...prevClothes];
      });
    },
    [setClothes]
  );

  const loadClothes = () => {
    fetch(GET_URL)
      .then((res) => res.json())
      .then((res) => setClothes(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadClothes();
  }, [setClothes]);

  const onDelete = useCallback(async (id: number) => {
    fetch(`${DELETE_URL}${id}`, {
      method: "DELETE",
    })
      .then(loadClothes)
      .catch((err) => console.log(err));
  }, []);

  const deleteAllSelected = useCallback(() => {
    const selected = clothes.filter((cloth) => cloth.selected);
    return Promise.all(selected.map((cloth) => onDelete(cloth.id)));
  }, [clothes, onDelete]);

  const actions: Action[] = [
    {
      name: "Delete selected",
      onClick: deleteAllSelected,
    },
  ];

  return (
    <AppLayout title="Wardrobe">
      <div className="bg-white overflow-hidden shadow rounded-lg mt-4">
        <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl mb-2 font-extrabold tracking-tight text-gray-900">
            Clothes in your wardrobe
          </h2>

          <Dropdown actions={actions} />

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {clothes.map((cloth, index) => (
              <div key={cloth.id} className="group relative">
                <div className="absolute z-10 top-2 left-2 flex items-center h-5">
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded"
                    checked={cloth.selected}
                    onChange={(e) => changeChecked(index, e.target.checked)}
                  />
                </div>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={cloth.image}
                    alt="cloth visual"
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => {
                          history.push(`/wardrobe/${cloth.id}`);
                        }}
                      />
                      {cloth.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{cloth.style}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {cloth.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
