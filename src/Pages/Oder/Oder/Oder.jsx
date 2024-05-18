import { useState } from "react";
import oderCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../Hooks/useMenu";
import OderTab from "../OderTab/OderTab";
import { useParams } from "react-router-dom";
const Oder = () => {
  const categories = ['salad','Pizza','soup','dessert','drinks'];
  const {category} =useParams();
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();


  const desserts = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Cover img={oderCover} title="OUR SHOP"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OderTab items={salad}></OderTab>
        </TabPanel>
        <TabPanel>
          <OderTab items={pizza}></OderTab>
        </TabPanel>
        <TabPanel>
          <OderTab items={soup}></OderTab>
        </TabPanel>
        <TabPanel>
          <OderTab items={desserts}></OderTab>
        </TabPanel>
        <TabPanel>
          <OderTab items={drinks}></OderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Oder;
