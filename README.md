# AmLI - Adaptive Monitoring Layered Intelligence

## 📋 Project Overview

AmLI is a comprehensive security services website that provides professional security solutions including private security services, VIP protection, ride escort services, emergency response, smart monitoring, and legal support. The project features advanced copy-paste protection, anti-scraping measures, and a robust backend system for managing service requests.

## 🏢 Business Model & Services

### Core Security Services Offered

1. **Private Security Services** (`private-security-services.html`)
   - Personal security guards
   - Event security management
   - Property protection services
   - 24/7 security monitoring

2. **VIP Protection** (`vip-protection.html`)
   - High-profile individual protection
   - Executive security details
   - Celebrity protection services
   - Diplomatic security

3. **Ride Escort Services** (`ride-escort-services.html`)
   - Secure transportation services
   - Chauffeur-driven security vehicles
   - Route planning and risk assessment
   - Multi-personnel escort teams

4. **Emergency Response** (`emergency-response.html`)
   - 24/7 emergency security response
   - Rapid deployment teams
   - Crisis management
   - Incident response coordination

5. **Smart Monitoring** (`smart-monitoring.html`)
   - Advanced surveillance systems
   - AI-powered threat detection
   - Real-time monitoring dashboards
   - Predictive security analytics

6. **Legal Support & Reporting** (`legal-support-reporting.html`)
   - Legal assistance for security incidents
   - Incident documentation and reporting
   - Compliance management
   - Court testimony support

## 🛡️ Advanced Security Features

### Multi-Layer Copy-Paste Protection

The `right.js` file implements comprehensive client-side protection:

#### Keyboard Shortcuts Blocked
```javascript
// Disabled shortcuts:
- Ctrl+C (Copy)
- Ctrl+V (Paste) 
- Ctrl+A (Select All)
- Ctrl+X (Cut)
- Ctrl+Z (Undo)
- Ctrl+Y (Redo)
- F12 (Developer Tools)
- Ctrl+Shift+I (Inspect Element)
- Ctrl+Shift+J (Console)
- Ctrl+U (View Source)
- Ctrl+S (Save Page)
```

#### Mouse & Touch Protection
- Right-click context menu disabled
- Text selection prevention (`selectstart` event)
- Drag and drop blocking (`dragstart` event)
- Copy/paste/cut event prevention
- Multi-touch gesture blocking on mobile
- Touch callout disabled

#### Visual Protection
- CSS-based text selection prevention
- Watermark overlay for screenshot prevention
- Tap highlight removal
- Input fields maintain usability for forms

#### Anti-Debugging Measures
- Developer tools detection
- Console access blocking
- Debugger statement protection
- Automation framework detection

## 🏗️ Technical Architecture

### Frontend Stack

#### HTML Structure
- **11 HTML Pages**: Complete service portfolio
- **Semantic HTML5**: Proper document structure
- **Meta Tags**: SEO and social media optimization
- **Favicon**: Custom AmLI branding

#### CSS Framework & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Color Scheme**:
  - `amli-dark`: #2A2D34
  - `amli-gray`: #C0C0C0  
  - `amli-white`: #FFFFFF
- **Font Awesome Icons**: Professional iconography
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Intersection Observer-based reveals

#### JavaScript Functionality
- **Security Protection**: `right.js` with comprehensive blocking
- **Interactive Elements**: Hover effects, transitions
- **Form Handling**: Client-side validation
- **Animation System**: Reveal animations for content sections

### Backend Architecture

#### API Endpoints (`/api/`)

**1. Hello Endpoint** (`api/hello.js`)
```javascript
// Simple health check endpoint
GET /api/hello
Response: { ok: true, message: "Hello from AmLI API" }
```

**2. Request Handler** (`api/request.js`)
```javascript
// Comprehensive service request processing
POST /api/request
Features:
- Google Sheets integration
- Email notifications via Resend
- Request ID generation
- Serial number management
- CORS handling
- Error handling and validation
```

#### Database Integration (`db.py`)

**Dual Database System**:
1. **Google Sheets**: Primary data collection
2. **MySQL Database**: Local data storage and backup

**Database Schema** (`service_requests` table):
```sql
- Serial_No (INT)
- Request_Timestamp (VARCHAR)
- First_name, Last_name (VARCHAR)
- Email, Phone_Number (VARCHAR)
- Pickup_Location, Dropoff_Location (TEXT)
- Start_Date, Preferred_time (VARCHAR)
- Service_Duration, Transportation_Type (VARCHAR)
- No_Of_Personnel (VARCHAR)
- Additional_Information (TEXT)
- Request_Id (VARCHAR UNIQUE)
- Status, Dash (VARCHAR)
- Driver_ID_Employee_ID (VARCHAR)
- Driver_Full_Name, Driver_Phone_No (VARCHAR)
- Vehicle_Type, License_Number (VARCHAR)
- Bio (TEXT)
- Assigned_Unassigned (VARCHAR)
```

#### Google Cloud Integration
- **Service Account**: `service_account.json`
- **Google Sheets API**: Real-time data synchronization
- **OAuth2 Authentication**: Secure API access
- **Spreadsheet**: "AmLI_Service_Requests"

#### Email System
- **Resend API**: Professional email delivery
- **Automated Notifications**: Request confirmations
- **Admin Alerts**: New service requests
- **Template System**: Structured email formatting

### Dependencies (`package.json`)

```json
{
  "name": "amli",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "googleapis": "^133.0.0",    // Google Sheets integration
    "resend": "^4.0.0"           // Email service
  }
}
```

## 📁 Detailed Project Structure

```
AmLI/
├── 📄 HTML Pages (11 total)
│   ├── index.html                    # Main homepage with service overview
│   ├── 404.html                      # Custom error page
│   ├── Shraddha_Gaur_.html          # Technical assessment page
│   ├── ride-escort-services.html    # Transportation security services
│   ├── vip-protection.html          # High-profile protection services
│   ├── terms-of-service.html        # Legal terms and conditions
│   ├── smart-monitoring.html        # Surveillance and monitoring services
│   ├── private-security-services.html # General security services
│   ├── privacy-policy.html          # Privacy policy and data handling
│   ├── legal-support-reporting.html # Legal assistance services
│   └── emergency-response.html      # Emergency security response
│
├── 🔧 Backend & API
│   ├── api/
│   │   ├── hello.js                 # Health check endpoint
│   │   └── request.js               # Service request processing
│   ├── db.py                        # Database synchronization script
│   └── service_account.json         # Google Cloud credentials
│
├── 🛡️ Security
│   └── right.js                     # Comprehensive protection script
│
├── 🎨 Assets
│   ├── images/                      # Service images and icons
│   │   ├── 2.png, 3D.png
│   │   ├── customer_support.png
│   │   ├── Emergency Response.png
│   │   ├── globe-grid.png
│   │   ├── Leagle Support.png
│   │   ├── Private Security Service.png
│   │   ├── Ride Scort 1.png, Ride.png
│   │   ├── Security Servilance.png
│   │   ├── Team_assigning.png
│   │   ├── Umbrella.png
│   │   ├── VIP Protaction.png
│   │   └── image.jpg
│   └── AmLI.png                     # Website favicon
│
├── 📋 Configuration
│   ├── package.json                 # Node.js dependencies
│   └── README.md                    # Project documentation
│
└── 📊 Special Features
    └── Shraddha_Gaur_.html         # Advanced technical test with:
        - PDF generation capabilities
        - Interactive forms
        - Real-time data processing
        - Professional assessment interface
```

## 🚀 Deployment & Hosting

### Vercel Deployment
- **Static Site Generation**: Optimized for Vercel's platform
- **Serverless Functions**: API endpoints as serverless functions
- **CDN Distribution**: Global content delivery
- **Automatic HTTPS**: SSL certificate management

### Environment Variables Required
```bash
# Google Sheets Integration
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SPREADSHEET_ID=your-spreadsheet-id
SHEET_NAME=Sheet1

# Email Configuration
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=admin@yourdomain.com,manager@yourdomain.com

# CORS Configuration
CORS_ALLOW_ORIGIN=https://yourdomain.com
```

## 🔧 Development Setup

### Prerequisites
- **Node.js**: v14 or higher
- **Python**: v3.7 or higher
- **MySQL**: Local database server
- **Google Cloud Account**: For Sheets API access
- **Resend Account**: For email services

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd AmLI
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE amli_db;
   ```

4. **Configure Environment**
   ```bash
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your credentials
   ```

5. **Run Database Sync**
   ```bash
   python db.py
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📊 Data Flow & Business Logic

### Service Request Process

1. **Client Submission**
   - User fills service request form
   - Client-side validation
   - Data sent to `/api/request`

2. **Backend Processing**
   - Request validation and sanitization
   - Unique request ID generation
   - Serial number assignment
   - Google Sheets data insertion

3. **Notification System**
   - Email sent to admin team
   - Confirmation email to client
   - Request tracking information

4. **Database Synchronization**
   - Python script syncs Google Sheets to MySQL
   - Handles duplicate prevention
   - Maintains data consistency

### Security Workflow

1. **Page Load**
   - `right.js` executes immediately
   - Security measures activated
   - Event listeners attached

2. **User Interaction**
   - Keyboard shortcuts blocked
   - Mouse events prevented
   - Text selection disabled

3. **Developer Tools Detection**
   - Continuous monitoring
   - Automatic page clearing if detected
   - Anti-debugging measures

## 🎨 Design System

### Color Palette
- **Primary Dark**: #2A2D34 (Professional, trustworthy)
- **Secondary Gray**: #C0C0C0 (Modern, clean)
- **Accent White**: #FFFFFF (Clean, professional)

### Typography
- **Primary Font**: System fonts (Segoe UI, Tahoma, Geneva, Verdana)
- **Fallback**: Sans-serif stack
- **Responsive**: Fluid typography scaling

### Component Library
- **Service Cards**: Hover effects, shadow transitions
- **Navigation**: Responsive mobile menu
- **Forms**: Professional styling with validation
- **Buttons**: Primary/secondary variants with animations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1024px
- **Desktop**: 1025px+

### Mobile Optimizations
- Touch-friendly interface
- Optimized image loading
- Compressed animations
- Mobile-specific security measures

## 🔒 Security Implementation Details

### Client-Side Protection Layers

1. **Event Prevention**
   ```javascript
   // Blocks all copy-paste operations
   document.addEventListener('keydown', function(e) {
       if (e.ctrlKey && e.key === 'c') e.preventDefault();
       // ... additional shortcuts
   });
   ```

2. **CSS Protection**
   ```css
   * {
       -webkit-user-select: none !important;
       user-select: none !important;
   }
   ```

3. **Mobile Security**
   ```javascript
   // Prevents mobile-specific copying
   document.addEventListener('touchstart', function(e) {
       if (e.touches.length > 1) e.preventDefault();
   });
   ```

### Server-Side Security
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Sanitized user inputs
- **Error Handling**: Secure error messages
- **Rate Limiting**: Prevents abuse

## 📈 Performance Optimizations

### Frontend Optimizations
- **CDN Resources**: Tailwind CSS, Font Awesome
- **Image Optimization**: Compressed service images
- **Lazy Loading**: Intersection Observer animations
- **Minified JavaScript**: Optimized security script

### Backend Optimizations
- **Serverless Functions**: Scalable API endpoints
- **Database Indexing**: Optimized query performance
- **Caching**: Reduced API calls
- **Error Handling**: Graceful failure management

## 🧪 Testing & Quality Assurance

### Manual Testing Checklist
- [ ] Copy-paste protection on all pages
- [ ] Mobile responsiveness
- [ ] Form submission functionality
- [ ] Email notification system
- [ ] Database synchronization
- [ ] Cross-browser compatibility

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📞 Support & Maintenance

### Contact Information
- **Website**: Main AmLI website
- **Email**: Through contact forms
- **Phone**: Service-specific contact numbers

### Maintenance Schedule
- **Weekly**: Database synchronization
- **Monthly**: Security updates
- **Quarterly**: Performance optimization
- **Annually**: Full security audit

## 📄 Legal & Compliance

### Legal Documents
- **Terms of Service**: `/terms-of-service.html`
- **Privacy Policy**: `/privacy-policy.html`
- **Copyright**: © 2025 AmLI. All rights reserved.

### Compliance Features
- **GDPR Compliance**: Data protection measures
- **Accessibility**: WCAG guidelines
- **Security Standards**: Industry best practices

## 🔄 Version History & Roadmap

### Current Version: v1.2.0
- ✅ Comprehensive copy-paste protection
- ✅ Mobile security optimization
- ✅ Advanced anti-scraping measures
- ✅ Professional service portfolio
- ✅ Robust backend system

### Future Enhancements
- 🔄 Real-time chat support
- 🔄 Advanced analytics dashboard
- 🔄 Mobile app development
- 🔄 AI-powered threat detection
- 🔄 Multi-language support

## 🤝 Contributing & Development

### Development Guidelines
- **Code Style**: Consistent formatting
- **Security First**: All changes must maintain security
- **Testing**: Comprehensive testing required
- **Documentation**: Update README for changes

### Security Considerations
- **No External Contributions**: Proprietary security system
- **Internal Review**: All changes reviewed internally
- **Security Audit**: Regular security assessments

## 📋 License & Copyright

**Proprietary Software**: All rights reserved by AmLI
- **Copyright**: © 2025 AmLI. All rights reserved.
- **Trademark**: AmLI and related marks are proprietary
- **Distribution**: Not for public distribution
- **Modification**: Restricted to authorized personnel only

---

## 🏆 Project Summary

AmLI represents a comprehensive security services platform that combines professional service delivery with advanced technical protection. The project demonstrates expertise in:

- **Full-Stack Development**: Frontend, backend, and database integration
- **Security Implementation**: Multi-layer protection systems
- **Business Logic**: Complete service request workflow
- **Professional Design**: Modern, responsive user interface
- **Scalable Architecture**: Vercel deployment with serverless functions

**AmLI - Adaptive Monitoring Layered Intelligence**  
*Protecting what matters most with cutting-edge technology and professional service delivery.*
