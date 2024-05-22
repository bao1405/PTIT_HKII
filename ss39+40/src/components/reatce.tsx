import React, { useState } from 'react';

const EmployeeManagementApp: React.FC = () => {
  // State cho danh sách công việc
  const [tasks, setTasks] = useState([
    { 
        id: 1, 
        name: 'Quét nhà', 
        completed: true 
    },
    { 
        id: 2, 
        name: 'Giặt quần áo', 
        completed: false 
    }
  ]);

  // State cho tên công việc mới và hiển thị modal
  const [newTaskName, setNewTaskName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Hàm xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  // Hàm xử lý submit form thêm công việc
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskName.trim()) {
      // Hiển thị modal cảnh báo khi tên công việc trống
      setModalVisible(true);
      return;
    }
    const isDuplicate = tasks.some(task => task.name === newTaskName);
    if (isDuplicate) {
      // Hiển thị modal cảnh báo khi tên công việc trùng
      setModalVisible(true);
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  // Hàm xử lý toggle công việc đã hoàn thành
  const handleTaskToggle = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Hàm xử lý xóa công việc
  const handleDeleteTask = (taskId: number) => {
    // Hiển thị modal xác nhận xóa công việc
    setModalVisible(true);

    // Hàm xác nhận xóa công việc
    const confirmDelete = () => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      setModalVisible(false);
    };

    const cancelDelete = () => {
      setModalVisible(false);
    };
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <form
                  className="d-flex justify-content-center align-items-center mb-4"
                  onSubmit={handleSubmit}
                >
                  <div className="form-outline flex-fill">
                    <input
                      type="text"
                      id="form2"
                      className="form-control"
                      value={newTaskName}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="form2">
                      Nhập tên công việc
                    </label>
                  </div>
                  <button type="submit" className="btn btn-info ms-2">
                    Thêm
                  </button>
                </form>

                {/* Bảng hiển thị danh sách công việc */}
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên công việc</th>
                      <th>Hoàn thành</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(task => (
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.completed ? <s>{task.name}</s> : task.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task.id)}
                          />
                        </td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2">
                            <i className="fas fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <i className="far fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      {modalVisible && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" onClick={cancelDelete}></i>
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={cancelDelete}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployeeManagementApp;
