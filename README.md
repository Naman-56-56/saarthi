# 🎯 Saarthi - PM Yuva Portal

<div align="center">

![Saarthi Banner](docs/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=green)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**🌟 Connecting Students with Government Internships through AI-Powered Career Guidance**

[🚀 Live Demo](https://kw2k31cw-3000.inc1.devtunnels.ms/) • [📚 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/Naman-56-56/saarthi/issues) • [💡 Request Feature](https://github.com/Naman-56-56/saarthi/issues)

</div>

---

## 🌈 What is Saarthi?

<div align="center">
<img src="https://via.placeholder.com/600x300/F3F4F6/374151?text=Saarthi+Dashboard+Preview" alt="Saarthi Dashboard" width="80%" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
</div>

**Saarthi** (meaning "Guide" in Hindi) is a revolutionary full-stack platform that bridges the gap between ambitious students and government internship opportunities. Powered by cutting-edge AI and machine learning, Saarthi transforms the way students discover, apply for, and secure meaningful internships in the public sector.

### 🎭 The Problem We Solve

- 📊 **Fragmented Information**: Government internships scattered across multiple platforms
- 🎯 **Mismatched Applications**: Students applying for unsuitable positions
- ⏰ **Time-Consuming Process**: Manual searching and application tracking
- 📈 **Limited Guidance**: Lack of personalized career recommendations

---

## ✨ Key Features

<div align="center">

| 🔐 **Secure Authentication** | 🎯 **Smart Matching** | 📊 **Progress Tracking** |
|:---:|:---:|:---:|
| OTP-based verification with email integration | AI-powered recommendations using ML algorithms | Real-time application status and analytics |
| Multi-factor authentication support | Skill-based internship matching | Achievement badges and leaderboards |

</div>

### 🚀 Core Capabilities

```mermaid
graph TD
    A[Student Registration] --> B[Profile Creation]
    B --> C[AI Analysis]
    C --> D[Personalized Recommendations]
    D --> E[Application Management]
    E --> F[Progress Tracking]
    F --> G[Success Metrics]
    
    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style D fill:#e8f5e8
    style G fill:#fff3e0
```

#### 🎨 User Experience
- **🌓 Dark/Light Mode**: Adaptive theming for comfortable browsing
- **📱 Mobile Responsive**: Seamless experience across all devices
- **⚡ Lightning Fast**: Optimized performance with Next.js
- **🎭 Intuitive UI**: Modern design with Tailwind CSS

#### 🧠 AI-Powered Intelligence
- **🤖 Machine Learning**: scikit-learn powered recommendation engine
- **📈 Predictive Analytics**: Career path suggestions based on skills
- **🎯 Smart Filtering**: Advanced search with multiple parameters
- **📊 Data Insights**: Comprehensive analytics dashboard

#### 👥 Administrative Excellence
- **🛠️ Django Admin**: Comprehensive backend management
- **📋 Content Management**: Easy internship listing updates
- **📊 User Analytics**: Detailed user behavior insights
- **🔧 System Monitoring**: Real-time application health checks

---

## 📈 Architecture Visualization

<div align="center">

### 🎯 Complete Architecture Overview

Below is our comprehensive architecture showing all components, data flows, and integrations:

<img src="https://raw.githubusercontent.com/Naman-56-56/saarthi/main/docs/architecture.png" alt="Saarthi Architecture" width="90%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); border: 1px solid #e1e5e9;">

*Interactive Architecture & Communication Flow Diagram*

</div>

### 🔍 Architecture Breakdown

The architecture follows a **microservices-inspired monolithic** approach with clear separation of concerns:

#### 👥 **User Layer**
- **Students**: Primary users seeking internships
- **Employers**: Organizations posting opportunities  
- **Admins**: Platform administrators

#### 🎨 **Frontend Layer** 
- **React.js**: Component-based UI framework
- **TailwindCSS**: Utility-first styling
- **Next.js**: Full-stack React framework

#### 🔧 **Backend Layer**
- **Django**: Web framework with ORM
- **DRF**: REST API framework for endpoints

#### 🧠 **ML Recommendation Engine**
- **NLP**: Natural Language Processing for job matching
- **Content-based Filtering**: Skills and preference matching
- **Collaborative Filtering**: User behavior analysis

#### 💾 **Database & Storage**
- **PostgreSQL**: Primary relational database
- **Redis**: Caching and session storage
- **Cloud Storage**: File and media storage

#### 🌐 **External Integrations**
- **Internshala**: Internship data source
- **PM Portal**: Government internship programs
- **Kaggle**: ML training datasets

#### 🚀 **Deployment & Infrastructure**
- **Docker**: Containerized applications
- **Kubernetes**: Container orchestration
- **NGINX**: Web server and reverse proxy

---

## 🛠️ Technology Stack

<div align="center">
</div>

### 🎯 Architectural Overview

```mermaid
graph TB
    subgraph "User Layer"
        U1[👨‍🎓 Students]
        U2[🏢 Employers]
        U3[👨‍💼 Admin]
    end
    
    subgraph "Frontend Layer"
        F1[⚛️ React.js]
        F2[🎨 TailwindCSS]
        F3[📱 Next.js App Router]
    end
    
    subgraph "Backend Layer"
        B1[🐍 Django REST API]
        B2[🔐 Authentication Service]
        B3[📧 Email Service]
        B4[🛡️ Authorization]
    end
    
    subgraph "ML Recommendation Engine"
        ML1[🤖 NLP Processing]
        ML2[📊 Content-based Filtering]
        ML3[🤝 Collaborative Filtering]
        ML4[⚡ Real-time Recommendations]
    end
    
    subgraph "Data Layer"
        D1[(🐘 PostgreSQL)]
        D2[(⚡ Redis Cache)]
        D3[☁️ Cloud Storage]
    end
    
    subgraph "External Data Sources"
        E1[🏛️ Internshala API]
        E2[📋 PM Portal Data]
        E3[📊 Kaggle Datasets]
    end
    
    subgraph "Deployment & Infrastructure"
        I1[🐳 Docker]
        I2[☸️ Kubernetes]
        I3[🌐 NGINX]
    end
    
    U1 --> F1
    U2 --> F1
    U3 --> F1
    
    F1 --> B1
    F2 --> F1
    F3 --> F1
    
    B1 --> ML1
    B1 --> D1
    B2 --> B1
    B3 --> B1
    B4 --> B1
    
    ML1 --> ML2
    ML2 --> ML3
    ML3 --> ML4
    
    D1 --> D2
    D2 --> D3
    
    E1 --> B1
    E2 --> B1
    E3 --> ML1
    
    I1 --> I2
    I2 --> I3
    
    style U1 fill:#e3f2fd
    style U2 fill:#f3e5f5
    style U3 fill:#e8f5e8
    style ML1 fill:#fff3e0
    style ML2 fill:#fff3e0
    style ML3 fill:#fff3e0
    style ML4 fill:#fff3e0
```

### 🔄 Data Flow Architecture

```mermaid
sequenceDiagram
    participant S as 👨‍🎓 Student
    participant F as 🌐 Frontend
    participant A as 🔐 Auth Service
    participant API as 🚀 Django API
    participant ML as 🤖 ML Engine
    participant DB as 💾 Database
    participant E as 📧 Email Service
    
    S->>F: Login/Register
    F->>A: Authentication Request
    A->>E: Send OTP
    E-->>S: OTP Email
    S->>F: Enter OTP
    F->>A: Verify OTP
    A->>DB: Store Session
    A-->>F: JWT Token
    
    S->>F: Request Recommendations
    F->>API: GET /api/recommendations/
    API->>ML: Process User Profile
    ML->>DB: Fetch User Data & Preferences
    ML->>ML: Run ML Algorithms
    ML-->>API: Personalized Results
    API-->>F: JSON Response
    F-->>S: Display Recommendations
    
    S->>F: Apply for Internship
    F->>API: POST /api/applications/
    API->>DB: Store Application
    API->>E: Send Confirmation
    E-->>S: Application Confirmation
```

### 🎨 Frontend Architecture Deep Dive

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Next.js 14 App Router                 │
├─────────────────────────────────────────────────────────────┤
│  📱 Pages & Layouts  │  🧩 Components  │  🔧 Custom Hooks   │
│  ┌─────────────────┐ │ ┌─────────────┐ │ ┌─────────────────┐ │
│  │ • (auth)/       │ │ │ • UI Base   │ │ │ • useAuth()     │ │
│  │ • dashboard/    │ │ │ • Forms     │ │ │ • useProfile()  │ │
│  │ • internships/  │ │ │ • Charts    │ │ │ • useSearch()   │ │
│  │ • profile/      │ │ │ • Modals    │ │ │ • useFilters()  │ │
│  └─────────────────┘ │ └─────────────┘ │ └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│         🎨 Styling Layer        │        📚 Utility Layer   │
│  ┌─────────────────────────────┐ │ ┌─────────────────────────┐ │
│  │ • TailwindCSS Classes       │ │ │ • API Clients           │ │
│  │ • Custom CSS Variables      │ │ │ • Data Validators       │ │
│  │ • Theme Configuration       │ │ │ • Helper Functions      │ │
│  │ • Responsive Breakpoints    │ │ │ • Constants & Types     │ │
│  └─────────────────────────────┘ │ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    ⚡ State Management                       │
│  • React Context API  • Local Storage  • Session Storage    │
└─────────────────────────────────────────────────────────────┘
```

### 🔧 Backend Architecture Deep Dive

```
┌──────────────────────────────────────────────────────────────┐
│                  🐍 Django REST Framework                   |
├──────────────────────────────────────────────────────────────┤
│    🔐 Auth Layer   │   📡 API Layer    │ 🧠 Business Logic │
│  ┌───────────────┐ │ ┌───────────────┐ │ ┌─────────────────┐ │
│  │ • JWT Tokens  │ │ │ • ViewSets    │ │ │ • Serializers   │ │
│  │ • OTP System  │ │ │ • Routers     │ │ │ • Validators    │ │
│  │ • Permissions │ │ │ • Pagination  │ │ │ • Permissions   │ │
│  │ • Middleware  │ │ │ • Filtering   │ │ │ • Custom Logic  │ │
│  └───────────────┘ │ └───────────────┘ │ └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│     🤖 ML Engine    │   📊 Data Layer   │   📧 Services      │
│  ┌───────────────┐ │ ┌───────────────┐ │ ┌─────────────────┐ │
│  │ • Recommender │ │ │ • Models      │ │ │ • Email Service │ │
│  │ • NLP Pipeline│ │ │ • Migrations  │ │ │ • File Upload   │ │
│  │ • Algorithms  │ │ │ • Querysets   │ │ │ • Notification  │ │
│  │ • Training    │ │ │ • Relations   │ │ │ • Analytics     │ │
│  └───────────────┘ │ └───────────────┘ │ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 🧠 ML Recommendation Engine

```mermaid
graph LR
    subgraph "Data Input"
        D1[👤 User Profile]
        D2[🎯 Skills]
        D3[📚 Education]
        D4[💼 Experience]
    end
    
    subgraph "NLP Processing"
        N1[📝 Text Preprocessing]
        N2[🔤 Tokenization]
        N3[📊 Vectorization]
    end
    
    subgraph "ML Algorithms"
        A1[🎯 Content Filtering]
        A2[🤝 Collaborative Filtering]
        A3[📊 Matrix Factorization]
        A4[🧠 Deep Learning]
    end
    
    subgraph "Output"
        O1[⭐ Ranked Recommendations]
        O2[📈 Confidence Scores]
        O3[🔍 Explanation]
    end
    
    D1 --> N1
    D2 --> N1
    D3 --> N1
    D4 --> N1
    
    N1 --> N2
    N2 --> N3
    
    N3 --> A1
    N3 --> A2
    N3 --> A3
    N3 --> A4
    
    A1 --> O1
    A2 --> O1
    A3 --> O2
    A4 --> O3
    
    style D1 fill:#e3f2fd
    style A1 fill:#fff3e0
    style A2 fill:#fff3e0
    style A3 fill:#fff3e0
    style A4 fill:#fff3e0
    style O1 fill:#e8f5e8
```

### 📊 Technical Specifications

<div align="center">

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Frontend Framework** | Next.js | 14.x | Server-side rendering & routing |
| **UI Library** | React | 18.x | Component-based architecture |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Backend Framework** | Django | 4.x | Web framework & API development |
| **API Framework** | Django REST | 3.x | RESTful API endpoints |
| **Database** | PostgreSQL | 15.x | Primary data storage |
| **Caching** | Redis | 7.x | Session & query caching |
| **ML Library** | scikit-learn | 1.3.x | Machine learning algorithms |
| **Data Processing** | Pandas | 2.x | Data manipulation & analysis |
| **Web Server** | NGINX | 1.x | Reverse proxy & load balancer |
| **Containerization** | Docker | 24.x | Application containerization |
| **Orchestration** | Kubernetes | 1.28.x | Container orchestration |

</div>

### 🔄 Communication Protocols

```mermaid
graph TB
    subgraph "Client Layer"
        A[🌐 Web Browser]
        B[📱 Mobile App]
    end
    
    subgraph "CDN & Load Balancer"
        C[🚀 Cloudflare CDN]
        D[⚖️ Load Balancer]
    end
    
    subgraph "Application Layer"
        E[🐳 Next.js Container]
        F[🐍 Django Container]
    end
    
    subgraph "Data Layer"
        G[🐘 PostgreSQL]
        H[⚡ Redis]
        I[☁️ File Storage]
    end
    
    A -->|HTTPS/HTTP2| C
    B -->|HTTPS/HTTP2| C
    C -->|SSL/TLS| D
    D -->|HTTP| E
    E -->|REST API| F
    F -->|SQL| G
    F -->|Cache| H
    F -->|Files| I
    
    style A fill:#e3f2fd
    style B fill:#e3f2fd
    style E fill:#f3e5f5
    style F fill:#e8f5e8
    style G fill:#fff3e0
```

### 🛡️ Security Architecture

```mermaid
graph LR
    subgraph "Authentication Flow"
        A1[📧 Email OTP]
        A2[🔐 JWT Tokens]
        A3[🔄 Refresh Tokens]
        A4[⏰ Session Management]
    end
    
    subgraph "Authorization"
        B1[👥 Role-Based Access]
        B2[🛡️ Permission Guards]
        B3[🔒 API Rate Limiting]
        B4[🚨 Activity Monitoring]
    end
    
    subgraph "Data Protection"
        C1[🔒 Data Encryption]
        C2[🛡️ SQL Injection Prevention]
        C3[🚫 XSS Protection]
        C4[📊 Audit Logging]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> A4
    
    A4 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    
    B4 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    
    style A1 fill:#e3f2fd
    style B1 fill:#f3e5f5
    style C1 fill:#e8f5e8
```

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=nextdotjs) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) |
| **Backend** | ![Django](https://img.shields.io/badge/-Django-092E20?style=flat&logo=django) ![DRF](https://img.shields.io/badge/-DRF-092E20?style=flat&logo=django) ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white) |
| **AI/ML** | ![scikit-learn](https://img.shields.io/badge/-scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white) ![Pandas](https://img.shields.io/badge/-Pandas-150458?style=flat&logo=pandas) ![Joblib](https://img.shields.io/badge/-Joblib-FF6B6B?style=flat) |
| **Database** | ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat&logo=sqlite) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) |
| **Tools** | ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white) ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=visual-studio-code) |

---

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- ![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=nodedotjs&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-8+-CB3837?style=flat&logo=npm&logoColor=white) or ![pnpm](https://img.shields.io/badge/pnpm-latest-F69220?style=flat&logo=pnpm&logoColor=white)

### ⚡ Installation Steps

<details>
<summary><b>🔽 Click to expand installation guide</b></summary>

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Naman-56-56/saarthi.git
cd saarthi
```

#### 2️⃣ Backend Setup (Django)
```bash
# Navigate to backend directory
cd saarthi

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

#### 3️⃣ Frontend Setup (Next.js)
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
pnpm install  # or npm install

# Start development server
pnpm dev     # or npm run dev
```

#### 4️⃣ Access Your Application
- 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend API**: [http://localhost:8000](http://localhost:8000)
- 👨‍💼 **Admin Panel**: [http://localhost:8000/admin](http://localhost:8000/admin)

</details>

---

## 🔧 Configuration

### 📧 Email Configuration

Create a `.env` file in the root directory:

```env
# Email Settings (Required for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password  # Use App Password for Gmail
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=your_email@gmail.com

# Database (Optional - SQLite is default)
DATABASE_URL=postgresql://user:password@localhost:5432/saarthi

# Security (Production)
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
```

### 🔒 Security Setup

For Gmail SMTP, enable 2FA and create an App Password:
1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use this password in `EMAIL_HOST_PASSWORD`

---

## 📁 Project Structure

```
saarthi/
├── 🎨 frontend/                    # Next.js Frontend Application
│   ├── 📱 app/                     # App Router Pages & Layouts
│   │   ├── (auth)/                 # Authentication Pages
│   │   ├── dashboard/              # User Dashboard
│   │   ├── internships/            # Internship Listings
│   │   └── profile/                # User Profile Management
│   ├── 🧩 components/              # Reusable UI Components
│   │   ├── ui/                     # Base UI Components
│   │   ├── forms/                  # Form Components
│   │   └── charts/                 # Data Visualization
│   ├── 🔧 hooks/                   # Custom React Hooks
│   ├── 📚 lib/                     # Utility Functions & Constants
│   └── 🌍 public/                  # Static Assets & Images
├── 🔧 saarthi/                     # Django Backend Application
│   ├── 👤 users/                   # User Management & Authentication
│   │   ├── models.py               # User & Profile Models
│   │   ├── serializers.py          # API Serializers
│   │   └── views.py                # API Views & Logic
│   ├── 💼 recommendations/         # Internship & ML Engine
│   │   ├── models.py               # Internship Models
│   │   ├── ml_engine.py            # Machine Learning Logic
│   │   └── recommendation_service.py # Recommendation Algorithms
│   ├── ⚙️ saarthi/                 # Project Configuration
│   │   ├── settings.py             # Django Settings
│   │   ├── urls.py                 # URL Configuration
│   │   └── wsgi.py                 # WSGI Configuration
│   └── 📊 static/                  # Static Files (CSS, JS, Images)
├── 📋 requirements.txt             # Python Dependencies
├── 🔒 .env.example                 # Environment Variables Template
└── 📖 README.md                    # Project Documentation
```

---

## 🎯 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | User registration with OTP |
| `POST` | `/api/auth/login/` | User login |
| `POST` | `/api/auth/verify-otp/` | OTP verification |
| `POST` | `/api/auth/logout/` | User logout |

### 💼 Internship Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/internships/` | List all internships |
| `GET` | `/api/internships/{id}/` | Get specific internship |
| `POST` | `/api/internships/apply/` | Apply for internship |
| `GET` | `/api/recommendations/` | Get AI recommendations |

### 📊 Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/dashboard/` | User dashboard data |
| `GET` | `/api/analytics/leaderboard/` | Skill-based rankings |
| `GET` | `/api/analytics/progress/` | Application progress |

---

## 🤝 Contributing

We love contributions! Here's how you can help make Saarthi even better:

<div align="center">

### 🌟 Ways to Contribute

| 🐛 **Bug Reports** | 💡 **Feature Requests** | 🔧 **Code Contributions** |
|:---:|:---:|:---:|
| Found a bug? Report it! | Have an idea? Share it! | Want to code? Fork it! |

</div>

### 📝 Contribution Steps

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💾 Commit** your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **📤 Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🚀 Open** a Pull Request


### 👥 Contributors

<div align="center">

Thanks to all the amazing people who have contributed to Saarthi!


<table align="center">
    <tr>
        <td align="center">
            <a href="https://github.com/Naman-56-56">
                <img src="https://avatars.githubusercontent.com/u/104669389?v=4" width="70" alt="Naman-56-56"/><br/>
                <b>Naman Sharma</b><br/>
                <sub>Leader</sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Ankit500ak">
                <img src="https://avatars.githubusercontent.com/u/105011956?v=4" width="70" alt="Ankit500ak"/><br/>
                <b>Ankit Pal</b><br/>
                <sub>Developer</sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Dynamic-Fantasy">
                <img src="https://avatars.githubusercontent.com/u/122234982?v=4" width="70" alt="Dynamic-Fantasy"/><br/>
                <b>Dynamic Fantasy</b><br/>
                <sub>Contributor</sub>
            </a>
        </td>
    </tr>
</table>

[![Contributors](https://contrib.rocks/image?repo=Naman-56-56/saarthi)](https://github.com/Naman-56-56/saarthi/graphs/contributors)

</div>

---

## 📊 Project Statistics

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Naman-56-56/saarthi?style=social)
![GitHub forks](https://img.shields.io/github/forks/Naman-56-56/saarthi?style=social)
![GitHub issues](https://img.shields.io/github/issues/Naman-56-56/saarthi)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Naman-56-56/saarthi)


[![GitHub Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=Naman-56-56&theme=github-compact)](https://github.com/Naman-56-56/saarthi)

[![GitHub Activity Graph (Ankit500ak)](https://github-readme-activity-graph.vercel.app/graph?username=Ankit500ak&theme=github-compact)](https://github.com/Ankit500ak)

[![GitHub Activity Graph (Dynamic-Fantasy)](https://github-readme-activity-graph.vercel.app/graph?username=Dynamic-Fantasy&theme=github-compact)](https://github.com/Dynamic-Fantasy)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

<div align="center">

### 💎 Built With Love Using

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![scikit-learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)

### 🎯 Special Thanks

- **🏛️ Government of India** - For inspiring the PM Yuva initiative
- **👥 Open Source Community** - For amazing tools and libraries
- **🧠 AI/ML Community** - For advancing recommendation algorithms
- **🎨 Design Community** - For modern UI/UX inspirations

</div>

---

## 📞 Contact & Support

<div align="center">

### 💬 Get in Touch

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:codeweave12@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Naman-56-56)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/naman-kumar)

### 🆘 Need Help?

- 📚 **Documentation**: Check our comprehensive guides above
- 🐛 **Bug Reports**: [Create an issue](https://github.com/Naman-56-56/saarthi/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/Naman-56-56/saarthi/issues/new?template=feature_request.md)
- 💬 **General Questions**: [Start a discussion](https://github.com/Naman-56-56/saarthi/discussions)

### 🌟 Show Your Support

If Saarthi has helped you or inspired your project, please consider:

[![Star this repo](https://img.shields.io/badge/⭐-Star%20this%20repo-yellow?style=for-the-badge)](https://github.com/Naman-56-56/saarthi)
[![Follow on GitHub](https://img.shields.io/badge/👤-Follow%20on%20GitHub-blue?style=for-the-badge)](https://github.com/Naman-56-56)

</div>

---

<div align="center">

### 🚀 Ready to Transform Internship Discovery?

**[Get Started Now](https://kw2k31cw-3000.inc1.devtunnels.ms/)** • **[View Demo](https://kw2k31cw-3000.inc1.devtunnels.ms/)** • **[Join Community](https://github.com/Naman-56-56/saarthi/discussions)**

---

**Made with ❤️ by [Ankit Pal](https://github.com/Ankit500ak) &[Naman Sharma](https://github.com/Naman-56-56) for the future of student success**

*"Saarthi - Where Dreams Meet Opportunities"*

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" />
</div>