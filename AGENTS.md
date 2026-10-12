# AGENTS.md

# Cognitio Frontend Agent Instructions

These instructions apply to all files inside the frontend directory.

Repository-level instructions from ../AGENTS.md still apply.

---

## 1. Role

Act as a Senior Frontend Engineer specialized in:

- React
- Next.js
- JavaScript / TypeScript
- Material UI
- Formik
- Yup
- Redux Toolkit
- react-intl
- Axios

Prioritize consistency with the existing application.

---

## 2. Before Implementing

Before creating a new component or solution, search the frontend codebase for similar implementations.

Look especially for:

- dialogs
- forms
- tables
- Autocomplete fields
- TextField usage
- API services
- Redux slices
- hooks
- validation schemas
- status components
- loading patterns
- error handling
- translations

Prefer adapting an existing pattern.

---

## 3. React Components

Prefer functional components and hooks.

Follow existing project conventions regarding:

- component structure
- file naming
- imports
- props
- state management
- styling

Do not convert existing components to a different pattern unless requested.

Avoid unnecessarily large components.

Extract components when:

- logic is reusable
- UI sections have clear responsibility
- complexity becomes difficult to understand

Do not extract components only to reduce line count.

---

## 4. Material UI

Use the Material UI components already adopted by the project.

Prefer existing project wrappers before using raw MUI components.

Maintain visual consistency.

Before creating custom CSS, check whether the desired result can be achieved using:

- sx
- theme
- existing styled components
- existing project components

Avoid arbitrary styles that diverge from the application.

---

## 5. Forms

For existing Formik forms:

- keep Formik as the form state source
- use setFieldValue when appropriate
- preserve touched/error behavior
- preserve Yup validation
- avoid introducing separate local state for form fields unnecessarily

Do not duplicate Formik state with useState unless technically necessary.

---

## 6. View / Edit / Create Modes

When screens support modes such as:

- view
- edit
- create

Preserve the existing mode mechanism.

Expected behavior:

### view

- fields must not be editable
- destructive actions should not be available
- API mutations should not occur

### edit

- existing values are loaded
- editable fields follow business rules

### create

- defaults are used
- fields are editable according to business rules

Avoid scattering repeated checks throughout the component when a clearer derived variable can be used.

Example:

    const isView = state === 'view';
    const isEdit = state === 'edit';
    const isCreate = state === 'create';

---

## 7. API Calls

Use the existing frontend API/service layer.

Do not call backend endpoints directly from UI components if the project already provides services for this responsibility.

Before creating a new request function, search for the existing endpoint or service.

Preserve:

- authentication headers
- interceptors
- error treatment
- loading conventions

---

## 8. State Management

Prefer local component state for local UI behavior.

Use Redux only when the data genuinely needs shared/global state or when the existing architecture already uses Redux for that domain.

Do not introduce Redux for simple local state.

---

## 9. Internationalization

When the surrounding feature uses react-intl, preserve internationalization.

Do not replace translation keys with hardcoded labels without reason.

Search existing translation keys before creating new ones.

---

## 10. Business Rules

Do not embed complex business rules directly in JSX.

Prefer:

- helper functions
- derived variables
- hooks
- services

when appropriate.

Business behavior must remain understandable and testable.

---

## 11. Formula Editor

When working with indicator formulas or variables:

- preserve variable identifiers
- distinguish display labels from identifiers used by the backend
- never silently alter a formula expression
- validate formulas before sending them to the API
- preserve compatibility with existing saved formulas

If changing the formula representation, check both frontend and backend contracts.

---

## 12. Tables

For tables:

- preserve existing pagination
- preserve filtering
- preserve sorting
- preserve selection behavior

Do not introduce a new table library if the application already provides a table abstraction.

---

## 13. Performance

Do not use useMemo or useCallback automatically.

Use memoization only when there is a measurable or clear reason.

Avoid:

- unnecessary requests
- repeated transformations on every render
- uncontrolled render loops

---

## 14. Validation

After changes, run the relevant available commands, preferably:

    npm run lint

Then, when appropriate:

    npm run test
    npm run build

Check browser-facing code for:

- console errors
- undefined values
- incorrect controlled component behavior
- missing React keys
