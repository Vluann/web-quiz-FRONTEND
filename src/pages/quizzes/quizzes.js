import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Table,
  Avatar,
  Tag,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  List,
  Spin,
} from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { getFullName } from "../../services/userServices";
import { getListAnswers } from "../../services/answerServices";
import { createTopic, getListTopics } from "../../services/topicServices";
import { getListQuestion } from "../../services/questionServices";
import { editques } from "../../services/editQuestions";
import { deleteTopics } from "../../services/deleteServices";

function QuizzesAdmin() {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataAnswers, setDataAnswers] = useState([]);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [dataQuestion, setDataQuestion] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [allUsers, allAnswers, quizRes] = await Promise.all([
          getFullName(),
          getListAnswers(),
          getListTopics(),
        ]);
        setDataUsers(allUsers?.data || []);
        setDataAnswers(allAnswers?.data || []);
        setDataQuiz(quizRes || []);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
        message.error("Không thể tải dữ liệu ban đầu");
      }
    };
    fetchApi();
  }, []);

  const attemptCountMap = {};
  dataAnswers.forEach((a) => {
    if (!attemptCountMap[a.userId]) attemptCountMap[a.userId] = 0;
    attemptCountMap[a.userId]++;
  });

  const topUsers = Object.keys(attemptCountMap)
    .map((userId) => {
      const user = dataUsers.find((u) => u._id === userId);
      if (!user) return null;
      return {
        userId,
        fullName: user.fullName,
        avatar: user.avatar || null,
        attempts: attemptCountMap[userId],
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 5);

  const topUsersColumns = [
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
  ];

  const topUsersTable = topUsers.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  const openAddModal = () => {
    addForm.resetFields();
    setIsAddModalOpen(true);
  };

  const handleAddFinish = async (values) => {
    try {
      await createTopic(values);
      const newQuiz = {
        name: values.name,
        _id: Date.now().toString(),
        questions: (values.questions || []).map((q, i) => ({
          id: i + 1,
          question: q.question,
          answers: q.answers ? q.answers.split("|") : [],
          correctAnswer: parseInt(q.correctAnswer, 10),
        })),
      };
      setDataQuiz((prev) => [...prev, newQuiz]);
      message.success("Thêm quiz thành công!");
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      console.error("lỗi khi thêm quiz:", error);
      message.error("Không thể thêm quiz");
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setSelectedTopic(null);
    setDataQuestion([]);
  };

  const handleSelectTopic = async (topic) => {
    if (!topic?._id) return message.error("Topic không hợp lệ!");
    setSelectedTopic(topic);
    setLoadingQuestions(true);
    try {
      const res = await getListQuestion(topic._id);
      setDataQuestion(res || []);
      editForm.setFieldsValue({
        topicName: topic.name,
        questions: res?.map((q) => ({
          question: q.question,
          answers: q.answers?.join("|"),
          correctAnswer: q.correctAnswer,
        })),
      });
    } catch (error) {
      console.error("Lỗi lấy câu hỏi:", error);
      message.error("Không thể tải danh sách câu hỏi!");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSubmitChanges = async (values) => {
    const updated = {
      topicId: selectedTopic._id,
      newTopicName: values.topicName,
      updatedQuestions: values.questions.map((q, idx) => ({
        index: idx + 1,
        question: q.question,
        answers: q.answers.split("|"),
        correctAnswer: parseInt(q.correctAnswer, 10),
      })),
    };
    const response = await editques(updated);
    if (response) console.log("Gửi Dữ Liệu Thành Công Lên BE!!!");
    message.success("Dữ liệu chỉnh sửa đã được in ra console!");
  };

  const handleDeleteQuiz = async (topicId) => {
    try {
      const response = await deleteTopics(topicId);
      if (response) console.log(response);
      console.log("Topic ID cần xóa:", topicId);
    } catch (error) {
      console.error("Lỗi khi xóa quiz:", error);
      message.error("Không thể xóa quiz!");
    }
  };

  const quizColumns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    { title: "Tên Quiz", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: 8 }}
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa quiz này không?"
            onConfirm={() => handleDeleteQuiz(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title="🏆 Top 5 User làm Quiz nhiều nhất"
            extra={<TrophyOutlined />}
          >
            <Table
              dataSource={topUsersTable}
              columns={topUsersColumns}
              rowKey="userId"
              pagination={false}
              scroll={{ x: 400 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24}>
          <Card
            title="📘 Danh sách Quiz"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
                Thêm Quiz
              </Button>
            }
          >
            <Table
              dataSource={dataQuiz}
              columns={quizColumns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Thêm Quiz mới"
        open={isAddModalOpen}
        onOk={() => addForm.submit()}
        onCancel={handleAddCancel}
        width={700}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddFinish}>
          <Form.Item
            label="Tên Quiz (Topic)"
            name="name"
            rules={[{ required: true, message: "Nhập tên quiz!" }]}
          >
            <Input placeholder="VD: Toán học Hack Não" />
          </Form.Item>

          <Form.List name="questions" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`Câu hỏi ${index + 1}`}
                    style={{ marginBottom: 10 }}
                    extra={
                      <Button danger onClick={() => remove(field.name)}>
                        Xóa
                      </Button>
                    }
                  >
                    <Form.Item
                      {...field}
                      label="Câu hỏi"
                      name={[field.name, "question"]}
                      rules={[{ required: true, message: "Nhập câu hỏi!" }]}
                    >
                      <Input placeholder="Nhập câu hỏi" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Đáp án (ngăn cách bằng dấu |)"
                      name={[field.name, "answers"]}
                      rules={[{ required: true, message: "Nhập đáp án!" }]}
                    >
                      <Input placeholder="VD: A|B|C|D" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Đáp án đúng (index)"
                      name={[field.name, "correctAnswer"]}
                      rules={[{ required: true, message: "Nhập đáp án đúng!" }]}
                    >
                      <Input placeholder="0" />
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Thêm câu hỏi
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        title="✏️ Chỉnh sửa Quiz"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            gap: 20,
          }}
        >
          <div style={{ flex: 1, maxHeight: 400, overflowY: "auto" }}>
            <h4>📚 Danh sách Quiz</h4>
            <List
              bordered
              dataSource={dataQuiz}
              renderItem={(item) => (
                <List.Item
                  style={{
                    cursor: "pointer",
                    background:
                      selectedTopic?._id === item._id ? "#e6f7ff" : "#fff",
                  }}
                  onClick={() => handleSelectTopic(item)}
                >
                  {item.name}
                </List.Item>
              )}
            />
          </div>

          <div style={{ flex: 2, marginTop: window.innerWidth < 768 ? 20 : 0 }}>
            {loadingQuestions ? (
              <div style={{ textAlign: "center", padding: 20 }}>
                <Spin />
              </div>
            ) : selectedTopic ? (
              <Form
                form={editForm}
                layout="vertical"
                onFinish={handleSubmitChanges}
              >
                <Form.Item
                  label="Tên Topic (Quiz)"
                  name="topicName"
                  rules={[{ required: true, message: "Nhập tên topic!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.List name="questions">
                  {(fields) => (
                    <>
                      {fields.map((field, idx) => (
                        <Card
                          key={field.key}
                          size="small"
                          title={`Câu hỏi ${idx + 1}`}
                          style={{ marginBottom: 10 }}
                        >
                          <Form.Item
                            {...field}
                            label="Câu hỏi"
                            name={[field.name, "question"]}
                            rules={[{ required: true, message: "Nhập câu hỏi!" }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Đáp án (ngăn cách bằng dấu |)"
                            name={[field.name, "answers"]}
                            rules={[{ required: true, message: "Nhập đáp án!" }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Đáp án đúng (index)"
                            name={[field.name, "correctAnswer"]}
                            rules={[{ required: true, message: "Nhập đáp án đúng!" }]}
                          >
                            <Input />
                          </Form.Item>
                        </Card>
                      ))}
                    </>
                  )}
                </Form.List>

                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  💾 Lưu thay đổi
                </Button>
              </Form>
            ) : (
              <p>Chọn quiz bên trái để chỉnh sửa</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuizzesAdmin;
