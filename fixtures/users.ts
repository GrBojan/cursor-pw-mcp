export const users = {
    standard: {
        username: process.env.TEST_USER_STANDARD,
        password: process.env.TEST_PASS_VALID,
    },
    locked: {
        username: process.env.TEST_USER_LOCKED,
        password: process.env.TEST_PASS_VALID,
    },
    problem: {
        username: process.env.TEST_USER_PROBLEM,
        password: process.env.TEST_PASS_VALID,
    },
    glitch: {
        username: process.env.TEST_USER_GLITCH,
        password: process.env.TEST_PASS_VALID,
    },
    invalid: {
        username: process.env.TEST_USER_INVALID,
        password: process.env.TEST_PASS_INVALID,
    },
    empty: {
        username: '',
        password: '',
    },
}; 