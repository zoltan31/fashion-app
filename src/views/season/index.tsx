import React, { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import Card from "../../components/Card";
import Notification from "../../components/Notification";

type Data = {
  active_style: string;
  next_style: string;
  current_season_start: string;
  next_season_start: string;
  expired_clothes: string[];
  types_needed: string[];
  webshop_url: string;
};

export default function SeasonPage() {
  const [data, setData] = useState<Data>();
  const [showNoti, setShowNoti] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/clothes_required")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        if (res.types_needed.length !== 0) {
          setShowNoti(true);
        }
      })
      .catch((err) => console.log(err));
  }, [setData]);

  return (
    <>
      <AppLayout title="Season">
        <div className="mt-2 grid grid-cols-2 gap-8">
          <Card>
            <h2 className="text-lg font-medium">Current Season</h2>
            {data ? (
              <>
                <p>The current season is: {data.active_style} Season!</p>
                <p>
                  Started at:{" "}
                  {new Date(data.current_season_start).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Card>
          <Card>
            <h2 className="text-lg font-medium">Next Season</h2>
            {data ? (
              <>
                <p>The next season is: {data.next_style} Season!</p>
                <p>
                  Starts at:{" "}
                  {new Date(data.next_season_start).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Card>
        </div>
      </AppLayout>
      <Notification
        show={showNoti}
        onHide={() => setShowNoti(false)}
        clothes={data?.types_needed}
        webshop_url={data?.webshop_url}
      />
    </>
  );
}
