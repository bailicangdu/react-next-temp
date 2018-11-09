import cowsay from 'cowsay-browser'

export default () =>
  <div>
    Hello world
    <p>scoped</p>
    <style jsx>{`
      p {
        color: yellow;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: yellow;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: #f5f5f5;
      }
    `}</style>
  </div>