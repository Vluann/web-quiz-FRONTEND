import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Drawer,
  Button,
  Grid,
} from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const menuItems = [
    {
      key: "/admin/dashboard-admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard-admin">Dashboard</Link>,
    },
    {
      key: "/admin/dashboard-quizzes",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/dashboard-quizzes">Quizzes</Link>,
    },
    {
      key: "/admin/users",
      icon: <TeamOutlined />,
      label: <Link to="/admin/dashboard-users">Users</Link>,
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: <Link to="/admin/dashboard-accounts">Settings</Link>,
    },
  ];

  const sidebar = (
    <>
      <div
        style={{
          height: 50,
          margin: 16,
          color: "white",
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Quiz Admin
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar desktop */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="md"
          collapsedWidth={80}
        >
          {sidebar}
        </Sider>
      )}

      {/* Drawer mobile */}
      {isMobile && (
        <Drawer
          title="📚 Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={() => setDrawerVisible(false)}
          />
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: isMobile ? "0 8px" : "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: 1,
              minWidth: 0,
            }}
          >
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
            )}
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? 16 : 20,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexShrink: 1,
              }}
            >
              Welcome back, Admin!
            </h2>
          </div>

          <Badge dot>
            <Avatar
              src="https://i.pravatar.cc/40"
              size={isMobile ? 32 : 40}
              icon={<UserOutlined />}
            />
          </Badge>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 100px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            overflowX: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
