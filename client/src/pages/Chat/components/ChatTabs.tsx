import React from 'react';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';


export const TabItems = [
  {
    name: 'Kişiler',
    tab: 1
  },
  {
    name: 'Odalar',
    tab: 2
  }
];

interface parentProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const ChatTabs = ({ setSelectedTab, selectedTab }: parentProps) => {
  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };
 
  return (
    <Tabs
      defaultActiveKey={selectedTab}
      onChange={handleTabChange}
      items={TabItems.map((Icon, i) => {
        const id = String(i + 1);
        return {
          label: <span className=' font-semibold'>{Icon.name}</span>,
          key: id,
          icon: Icon.tab === 1 ? <UserOutlined className=' font-semibold'/> : <TeamOutlined className='font-semibold'/>
        };
      })}
    />
  );
  };

export default ChatTabs;