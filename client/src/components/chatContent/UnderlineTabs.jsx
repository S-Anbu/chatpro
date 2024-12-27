import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AllUser from "../chatContent/Alluser"; // Import your AllUser component

export function UnderlineTabs() {
  const [activeTab, setActiveTab] = React.useState("all");
  
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {["All", "Personal", "Group"].map((label) => (
          <Tab
            key={label.toLowerCase()}
            value={label.toLowerCase()}
            onClick={() => setActiveTab(label.toLowerCase())}
            className={`${activeTab === label.toLowerCase() ? "text-gray-900" : ""} font-roboto` }
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value="all">
          <AllUser />
        </TabPanel>
        <TabPanel value="personal">
          <div>Personal Content</div>
        </TabPanel>
        <TabPanel value="group">
          <div>Group Content</div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
