import { Helmet } from "react-helmet-async";
import CityGridView from "@/sections/city-grid-view";

export default function CitiesPage() {
  return (
    <>
      <Helmet>
        <title>Cities | World Egypt</title>
      </Helmet>

      <CityGridView />
    </>
  );
}
