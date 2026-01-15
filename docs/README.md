# Backend Documentation

Complete documentation for T.O.O.L.S Inc Platform & MackChat backend architecture.

---

## 📚 Documentation Overview

This directory contains comprehensive guides for implementing, deploying, and maintaining the backend infrastructure.

### Documents

1. **[BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)** *(65 pages)*
   - Complete architecture overview
   - Technology stack recommendations with rationale
   - Service-by-service implementation details
   - Security considerations (OWASP, GDPR, HIPAA)
   - 6-phase implementation roadmap
   - Cost estimation and scaling guidance
   - High-level ASCII architecture diagrams

2. **[BACKEND_QUICKSTART.md](./BACKEND_QUICKSTART.md)** *(35 pages)*
   - Step-by-step Phase 1 implementation (authentication)
   - Azure resource provisioning commands
   - Complete code samples for auth functions
   - Local development setup
   - Testing procedures
   - Deployment instructions
   - Troubleshooting guide

3. **[API_REFERENCE.md](./API_REFERENCE.md)** *(25 pages)*
   - Complete REST API documentation
   - Authentication endpoints with examples
   - User management, courses, forms, messaging APIs
   - Request/response schemas
   - Error codes and handling
   - Rate limiting details
   - WebSocket event specifications

4. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** *(30 pages)*
   - Cosmos DB collection schemas
   - Azure SQL table definitions
   - Redis cache key patterns
   - Blob Storage container structure
   - Data retention policies
   - Backup strategies
   - Migration scripts

---

## 🚀 Quick Start

### For Developers (First Time Setup)

1. **Read the architecture** (30 min):
   ```bash
   cat docs/BACKEND_ARCHITECTURE.md
   ```

2. **Follow the quickstart guide** (2-4 hours):
   ```bash
   cat docs/BACKEND_QUICKSTART.md
   # Then execute steps 1-7
   ```

3. **Reference API docs** during development:
   ```bash
   cat docs/API_REFERENCE.md
   ```

### For Product Managers / Stakeholders

- **Architecture Overview**: Read Section 1-2 of `BACKEND_ARCHITECTURE.md`
- **Cost Estimates**: See Section 6 of `BACKEND_ARCHITECTURE.md`
- **Implementation Timeline**: See Section 5 of `BACKEND_ARCHITECTURE.md`

---

## 📋 Implementation Status

### Phase 1: Authentication (Weeks 1-2) - **IN PROGRESS**
- [ ] Azure Cosmos DB setup
- [ ] Redis cache setup
- [ ] Auth signup function
- [ ] Auth login function
- [ ] Auth logout function
- [ ] Auth refresh function
- [ ] Frontend integration
- [ ] Production deployment

### Phase 2: User & Courses (Weeks 3-4) - **PLANNED**
- [ ] User profile endpoints
- [ ] Course catalog API
- [ ] Course enrollment
- [ ] Progress tracking
- [ ] File uploads (avatars)

### Phase 3: Forms (Week 5) - **PLANNED**
- [ ] Azure SQL setup
- [ ] Contact form API
- [ ] Interest form API
- [ ] Referral form API
- [ ] Email notifications

### Phase 4: MackChat (Weeks 6-8) - **PLANNED**
- [ ] Azure Web PubSub setup
- [ ] Conversation management
- [ ] Real-time messaging
- [ ] File sharing
- [ ] WebSocket handlers

### Phase 5: Production Ready (Week 9) - **PLANNED**
- [ ] Application Insights
- [ ] Alerting
- [ ] Load testing
- [ ] Azure Front Door

### Phase 6: Advanced Features (Weeks 10+) - **FUTURE**
- [ ] Group messaging
- [ ] Video calls
- [ ] Push notifications
- [ ] GraphQL API
- [ ] Multi-region deployment

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────┐
│     Next.js 14 Frontend (Static)       │
│     Azure Static Web Apps + CDN        │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼──────┐   ┌────────▼────────┐
│ Azure        │   │ Azure Web       │
│ Functions v4 │   │ PubSub          │
│ (REST API)   │   │ (WebSocket)     │
└──────┬───────┘   └────────┬────────┘
       │                    │
   ┌───┴────────────────────┴───┐
   │                            │
┌──▼──────┐  ┌────────┐  ┌─────▼─────┐
│ Cosmos  │  │ Redis  │  │ Azure SQL │
│ DB      │  │ Cache  │  │ Database  │
│ (NoSQL) │  │        │  │ (Reports) │
└─────────┘  └────────┘  └───────────┘

┌──────────────────────────────────────┐
│  Azure Blob Storage (Files)          │
│  - Avatars  - Videos  - Documents    │
└──────────────────────────────────────┘
```

---

## 🔒 Security Highlights

- **Authentication**: JWT tokens with argon2id password hashing
- **Cookies**: httpOnly, Secure, SameSite (not localStorage)
- **Token Rotation**: Refresh tokens rotated on each use
- **Rate Limiting**: Per-IP and per-endpoint limits
- **Encryption**: TLS 1.3 in transit, AES-256 at rest
- **Secrets Management**: Azure Key Vault (no env vars)
- **Compliance**: GDPR data export/deletion, HIPAA-ready

---

## 💰 Cost Estimates

### Startup Scale (1,000 users)
- **Monthly**: ~$84
- Includes: Functions (free tier), Cosmos DB ($25), Redis ($16), SQL ($5), Blob ($2), Key Vault ($1), Front Door ($35)

### Growth Scale (10,000 users)
- **Monthly**: ~$591
- Includes: All services scaled appropriately

See Section 6 of `BACKEND_ARCHITECTURE.md` for detailed breakdown.

---

## 🧪 Testing

### Run API Tests
```bash
cd api
npm test
```

### Load Testing
```bash
# Use Azure Load Testing service
# See BACKEND_ARCHITECTURE.md Section 5 (Phase 5)
```

### Manual Testing
Use Postman collection (to be added) or `curl`:
```bash
# Test signup
curl -X POST http://localhost:7071/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!","name":"Test User"}'
```

---

## 📞 Support

### Questions?
- **Architecture decisions**: See `BACKEND_ARCHITECTURE.md` Section 1.1-1.7
- **Implementation issues**: See `BACKEND_QUICKSTART.md` Troubleshooting section
- **API usage**: See `API_REFERENCE.md` Error Codes section
- **Database queries**: See `DATABASE_SCHEMA.md` Queries sections

### Contributing
When adding new features:
1. Update API_REFERENCE.md with new endpoints
2. Update DATABASE_SCHEMA.md if schema changes
3. Add implementation notes to BACKEND_ARCHITECTURE.md
4. Update this README's implementation status

---

## 📝 Changelog

### v1.0.0 (January 2025)
- Initial documentation release
- Complete architecture design
- Phase 1-6 roadmap
- API reference v1
- Database schema v1

---

## 🔗 Related Documentation

- **Frontend**: See main [README.md](../README.md)
- **Docker**: See [DOCKER.md](../DOCKER.md)
- **Agents**: See [agents/README.md](../agents/README.md) (if exists)

---

**Maintained By:** T.O.O.L.S Inc Development Team  
**Last Updated:** January 2025
