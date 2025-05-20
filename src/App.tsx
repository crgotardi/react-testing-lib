function App() {
  return (
    <>
      <div id="app">
        <label htmlFor="username-input">Username</label>
        <input id="username-input" />

        <button type="submit" name="submit" aria-description="send">send</button>
        <button type="submit" name="submit" aria-description="submit">submit</button>
        <button type="submit" name="submit" aria-description="submit">Confirm</button>

        <label htmlFor="hello-world">Hello World</label>
        <input id="hello-world" />

        <label id="test">test</label>
        <input aria-labelledby="test" placeholder="placeholder" value="abc" />

        <span aria-labelledby="test">Please enter your username</span>
        <span title="text">Text</span>
        <p data-testingid="test-id">Text</p>

        <img alt="Incredibles 2 Poster" src="/incredibles-2.png" />
      </div>
    </>
  )
}

export default App
