
## Intro

To run the samples in this demo you will first need to run `npm install` from inside the repo root. All demos have npm scripts to simplify execution.

# What is TAP?

- **TAP = Test Anything Protocol**
  - Basic protocol created for testing Perl scripts.
  - Implementations in multiple languages

- `tap` JS library written by Isaac Z. Schlueter (@izs, founder of npm)
  - All of npm's test are built on tap, long term support.
  - Pros:
    - Can detect a test timing out.
    - Each test runs in own child process, less risk of environment corruption
  - Cons:
    - Cannot do browser testing

- `tape` JS library written by James Halliday (@substack, created Browserify)
  - Now has multiple maintainers and is used in hundreds of projects.
  - Pros:
    - Lighter-weight, faster.
    - Can be used in the browser.
  - Cons:
    - Most browser test centered around Browserify
    - No examples/tools for using with RequireJS

- Both libraries consist of two parts:

  1. Testing Framework (`require('tape').test`)
    - Outputs TAP to stdout
    - All tests assumed to be asynchronous
    - `test('name', function (t) {})`
      - Nest `test()` calls for subtests, instead of `define()` and `it()`
    - `t` contains assertions and `.end()`
    - Meshes well with sinon
      - `t.pass(spy.calledOnce)`
    - Can also use chai assertions.
      - Anything thrown within the `test()` function gets registered as a failed assertion, just like in mocha.
      - Wrap chai assertions in a `t.shouldNotThrow()` function to prevent undone tests.

  2. Testing Harness (shell command)
    - Receives TAP from tests.
    - `tap` formats into clean output, add `-C` to get raw TAP
    - `tape` aggregates results into a single output, must be piped to formatter.

- Both libraries can run each others tests.
  - For node testing there is a benefit to building tests with `tape` and running them with `tap`.

- Tests can be parallelized using Prove, a Perl TAP harness.
  - Dunno why nobody has made a node based parallelized test runner.

# Why use Tape over Mocha?

## Example 1

- Show `index.js`
  - Something wrong with this file, but don't look for it yet.

- Show `mocha/test.js`
  - Walk through test structure, point out assertions.

- `npm run mocha`
  - Show that test passes, everything looks good right?

- Show `tape/test.js`
  - Same test structure, just different way of calling assertions.

- `npm run tape`
  - Test is failing, why?
  - plan != count

- `node tape/test.js` to get raw output
  - Tape tests are normal node processes that output TAP to stdout
  - Each assertion is enumerated with `ok` and `not ok`, indents for sub-tests.
  - `t.plan(4)` call identifies expected four total assertions
  - Count off assertions, only three ran.
  - Note that close connection is missing
  - Identify missing parens on closeConnection call in `index.js`
  - Add parens, re-run test. Ta da.

- Show `mocha/test-working.js`
  - Mocha _can_ be made to catch missing executions
  - Mock functions wrapped in sinon spies
  - Assertions that spies were called at end of test
  - Requires more effort, greater risk, complicates tests

## Example 2

- Show `index2.js`
  - Basic unit, semi-contrived example. Returns collection of data.

- Show `mocha/test2.js`
  - Asserting that all three pieces of data pass.

- `npm run mocha2`
  - Test fails at first assertion.

- Show `tape/test2.js`
  - Exact same test.

- `npm run tape2`
  - Outputs all three failing assertions.
  - Because tape doesn't rely on assertions, it doesn't fall down on the first failure, giving more useful output.

## Coverage

- `npm run cover`
  - Show coverage folder.

- `npm run cover-mocha`
  - Show coverage.

- Both are created the same way through istanbul.
  - `istanbul cover tape tape/*`
  - `istanbul cover _mocha mocha/*`
    - Must use `_mocha` due to test runner isolation in `mocha`
    - `tap` runner has same problem, solves by bundling istanbul into itself
