import React from "react";
import AppLayout from "../../components/AppLayout";
import Card from "../../components/Card";

const nextSeasonDate = new Date(2021, 11, 1);
const nextSeasonName = "Hipster";
const currentSeasonDate = new Date(2021, 11, 1);
const currentSeasonName = "Retro";

export default function SeasonPage() {
  return (
    <AppLayout title="Season">
      <div className="mt-2 grid grid-cols-2 gap-8">
        <Card>
          <h2 className="text-lg font-medium">Current Season</h2>
          <p>The current season is: {currentSeasonName} Season!</p>
          <p>Started at: {currentSeasonDate.toLocaleDateString()}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-medium">Next Season</h2>
          <p>The next season is: {nextSeasonName} Season!</p>
          <p>Starts at: {nextSeasonDate.toLocaleDateString()}</p>
        </Card>
      </div>
    </AppLayout>
  );
}
