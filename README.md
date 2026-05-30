# 🚀 CPU Scheduling Simulator (Live + Comparison Engine)

A real-time CPU Scheduling Simulator that demonstrates how Operating System scheduling algorithms work internally. The project provides multiple scheduling techniques, live execution visualization, and an automatic comparison system to analyze performance efficiency.

---

## 📌 Features

### ⚙️ CPU Scheduling Algorithms
- First Come First Serve (FCFS)
- Shortest Job First (SJF - Non Preemptive)
- Shortest Remaining Job First (SRJF / SRTF)
- Priority Scheduling (Non Preemptive)
- Round Robin (RR)

---

### 🔥 Live Simulation Engine
- Real-time process execution visualization
- Dynamic Ready Queue updates
- CPU state tracking (Running / Idle)
- Step-by-step process lifecycle:
  - Ready → Running → Completed
- Dynamic Gantt chart generation

---

### 📊 Algorithm Comparison System
- Compare all scheduling algorithms simultaneously
- Performance metrics:
  - Waiting Time (WT)
  - Turnaround Time (TAT)
- Helps identify the most efficient algorithm for given inputs

---

### 🧠 Process Management System
- Process Table includes:
  - Process ID (PID)
  - Arrival Time (AT)
  - Burst Time (BT)
  - Priority
  - Remaining Time (for preemptive algorithms)
- Real-time status tracking of processes

---

## 🖥️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express.js

### Core Logic
- Pure JavaScript implementation of CPU Scheduling Algorithms

---

## ⚙️ How It Works

1. User enters process details (Arrival Time, Burst Time, Priority)
2. Selects a scheduling algorithm or comparison mode
3. Backend processes scheduling logic
4. Live simulation engine executes step-by-step flow
5. Gantt chart is generated dynamically
6. Comparison table displays performance results

---

## 📊 Output Metrics

Each algorithm generates:

- Completion Time (CT)
- Turnaround Time (TAT)
- Waiting Time (WT)
- Average WT
- Average TAT
- Gantt Chart Visualization

---

## 📈 Comparison Table Example

| Algorithm | Avg WT | Avg TAT | Performance |
|----------|--------|---------|-------------|
| FCFS     | --     | --      | Simple      |
| SJF      | --     | --      | Efficient   |
| SRJF     | --     | --      | Best        |
| Priority | --     | --      | Variable    |
| RR       | --     | --      | Fair        |

---

## 🎯 Key Highlights

- Real-time CPU scheduling simulation
- Visual understanding of Operating System concepts
- Supports both preemptive and non-preemptive algorithms
- Live process state tracking
- Dynamic Gantt chart visualization
- Algorithm comparison engine
- Educational + placement-ready project

---

## 📷 System Flow

Process Input → Scheduling Engine → Live Simulation → Gantt Chart → Comparison Analysis

---

## 🚀 Future Improvements

- Multilevel Queue Scheduling
- Multilevel Feedback Queue (MLFQ)
- Drag & Drop process input UI
- Animated Gantt chart transitions
- Export results as PDF

---

## 👨‍💻 Author

Developed as a **placement-focused Computer Science project** to demonstrate strong understanding of Operating Systems, CPU Scheduling algorithms, and real-time simulation systems.

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.  
It motivates further improvements and advanced feature development.
