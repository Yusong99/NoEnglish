# NoEnglishProject Backend - AI Coding Instructions

## Project Overview
This is a Spring Boot backend for a Japanese language learning app ("NoEnglishProject") that provides Chinese translations for JLPT vocabulary and words. Users learn Japanese without English intermediaries.

## Architecture
- **Framework**: Spring Boot 4.0.0 with MVC, JPA, Security
- **Database**: MySQL with Hibernate DDL auto-update
- **Authentication**: JWT tokens via `JwtAuthFilter`, passwords hashed with BCrypt
- **Structure**: Standard layered architecture (Controller → Service → Repository → Entity)
- **Key Entities**: `User`, `Word` (表记/读音/释义/词性), `Vocabulary` (JLPT levels N1-N5), `Dictionary`, `Language`

## Authentication & Security
- JWT tokens carried in `Authorization: Bearer <token>` header
- `JwtAuthFilter` validates tokens and sets `userId` in request attributes
- Protected endpoints use `@RequestAttribute("userId") Long userId`
- Public endpoints: `/auth/*`, `/avatar/*`, `/api/dictionaries`, `/covers`, `/api/vocab`

## API Patterns
- Controllers return `ApiResponse<T>` wrappers (e.g., `ApiResponse.success(data)`)
- Exceptions handled by `GlobalExceptionHandler` with custom error codes
- File uploads use `MultipartFile` (e.g., avatar in `AuthController`)
- Pagination: `page` and `size` query params (e.g., `WordController.search`)

## Data Model Notes
- `Word`: Japanese words with Chinese meanings and readings
- `Vocabulary`: JLPT categorized words with Japanese/Chinese examples
- `Dictionary`: Language-specific collections with cover images
- Relationships: Dictionary belongs to Language, User has avatar

## Development Workflow
- **Build**: `./mvnw clean package`
- **Run**: `./mvnw spring-boot:run`
- **Test**: `./mvnw test` (minimal tests currently)
- **Database**: Local MySQL at `localhost/no_english_project`, schema auto-updates
- **Static Assets**: Avatars served from `/Users/xuyusong/IdeaProjects/avatars/`, covers from `src/main/resources/static/covers/`

## Code Conventions
- Use Lombok `@Getter/@Setter/@Data` on entities
- Services implemented via interfaces in `service/impl/`
- Constructor injection preferred (e.g., `public WordController(WordService wordService)`)
- Chinese comments for domain-specific terms
- Entity IDs: `Long` for User/Word/Vocabulary, `Integer` for Dictionary/Language

## Common Patterns
- Search queries: `WordService.search(q, page, size, userId)` returns paginated results
- Random vocab: `VocabularyService.randomByLevel("N2")` for JLPT levels
- Avatar upload: `UserService.updateAvatar(userId, file)` returns URL string
- Error handling: Throw `BusinessException(code, message)` for business logic errors

## Dependencies
- JJWT 0.11.5 for JWT handling
- MySQL Connector/J for database
- Spring Security Crypto for password encoding
- Validation API for input validation</content>
<parameter name="filePath">/Users/xuyusong/IdeaProjects/NoEnglishProject/backend/.github/copilot-instructions.md