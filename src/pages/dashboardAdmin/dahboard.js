import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table, Avatar, Tag } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LineChartOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Column, Pie } from "@ant-design/plots";

import { getFullName } from "../../services/userServices";
import { getListTopics } from "../../services/topicServices";
import { countQuestion } from "../../services/questionServices";
import { getListAnswers } from "../../services/answerServices";

function DashboardAdmin() {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataTopics, setDataTopics] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const allUsers = await getFullName();
        const allTopics = await getListTopics();
        const allQuestions = await countQuestion();
        const allAnswers = await getListAnswers();

        setDataUsers(allUsers?.data || []);
        setDataTopics(allTopics || []);
        setDataQuestions(allQuestions || []);

        const normalizedAnswers = (allAnswers?.data || []).map((a) => ({
          userId: a.userId,
          topicId: a.topicId || null,
          percentScore: a.percentScore ?? 0,
          avgScore: a.avgScore ?? 0,
          completionTime: a.completionTime || null,
        }));
        setDataAnswers(normalizedAnswers);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    };
    fetchApi();
  }, []);

  const totalUsers = dataUsers.length;
  const totalTopics = dataTopics.length;
  const totalQuestions = dataQuestions.length;
  const totalAnswers = dataAnswers.length;

  const avgSystemScore =
    dataAnswers.length > 0
      ? (
          dataAnswers.reduce((sum, ans) => sum + (ans?.percentScore || 0), 0) /
          dataAnswers.length
        ).toFixed(2)
      : 0;

  const quizByDay = dataAnswers.reduce((acc, item) => {
    const day = item?.completionTime?.split(" ")[0];
    if (day) {
      if (!acc[day]) acc[day] = 0;
      acc[day]++;
    }
    return acc;
  }, {});

  const quizByDayData = Object.keys(quizByDay).map((day) => ({
    date: day,
    count: quizByDay[day],
  }));

  const columnConfig = {
    data: quizByDayData,
    xField: "date",
    yField: "count",
    color: "#1677ff",
    label: { position: "top" },
    xAxis: { label: { autoRotate: true } },
  };

  const topicScoreData = dataTopics.map((topic) => {
    const topicId = String(topic.id || topic._id || "");
    const topicName = topic.name || topic.title || "Unknown";

    const results = dataAnswers.filter((a) => String(a.topicId) === topicId);

    const avg = results.length
      ? results.reduce((s, r) => s + (r?.percentScore || 0), 0) / results.length
      : 0;

    return {
      type: topicName,
      value: parseFloat(avg.toFixed(2)),
    };
  });

  const pieConfig = {
    data: topicScoreData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    legend: { position: "bottom" },
    interactions: [
      { type: "element-active" },
      { type: "element-selected" },
    ],
  };

  const scoreMap = {};
  dataAnswers.forEach((item) => {
    if (!scoreMap[item.userId]) scoreMap[item.userId] = { total: 0, count: 0 };
    scoreMap[item.userId].total += item.percentScore || 0;
    scoreMap[item.userId].count += 1;
  });

  const rankingData = dataUsers.map((user) => {
    const record = scoreMap[user._id] || { total: 0, count: 0 };
    const avg = record.count > 0 ? record.total / record.count : 0;

    return {
      userId: user._id,
      fullName: user.fullName || "Không tên",
      avatar: user.avatar || null,
      avgScore: parseFloat(avg.toFixed(2)),
      attempts: record.count,
    };
  });

  const sortedRanking = rankingData.sort((a, b) => b.avgScore - a.avgScore);

  const rankingTableData = sortedRanking.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  const rankingColumns = [
    {
      title: "Hạng",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        if (rank === 1) return <Tag color="gold">🥇 {rank}</Tag>;
        if (rank === 2) return <Tag color="silver">🥈 {rank}</Tag>;
        if (rank === 3) return <Tag color="orange">🥉 {rank}</Tag>;
        return <Tag>{rank}</Tag>;
      },
    },
    {
      title: "Người chơi",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar
            src={record.avatar}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    { title: "Số lần làm Quiz", dataIndex: "attempts", key: "attempts" },
    {
      title: "Điểm trung bình",
      dataIndex: "avgScore",
      key: "avgScore",
      render: (score) => <b>{score}%</b>,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Tổng User"
              value={totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Tổng Quiz"
              value={totalTopics}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Tổng Câu hỏi"
              value={totalQuestions}
              prefix={<QuestionCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Lượt làm Quiz"
              value={totalAnswers}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Điểm TB Hệ thống"
              value={avgSystemScore}
              suffix="%"
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <Card title="📊 Lượt làm quiz theo ngày">
            <Column {...columnConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="🎯 Điểm trung bình theo Topic">
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col xs={24}>
          <Card title="🏆 Bảng xếp hạng Ranking" extra={<TrophyOutlined />}>
            <Table
              dataSource={rankingTableData}
              columns={rankingColumns}
              rowKey="userId"
              pagination={false}
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardAdmin;
