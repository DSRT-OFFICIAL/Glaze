export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",      // fitur baru → minor
        "fix",       // bugfix → patch
        "docs",      // dokumentasi → patch
        "style",     // style / format code → patch
        "refactor",  // refactor code → minor
        "perf",      // perbaikan performa → patch
        "test",      // menambah/memperbaiki test → tidak release
        "chore",     // update config/build → tidak release
        "ci"         // update workflow CI/CD → tidak release
      ]
    ],
    "scope-empty": [2, "never"], // wajib isi scope
    "subject-case": [0]          // bebas gaya subject
  }
};
