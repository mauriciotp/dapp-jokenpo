import { useState } from 'react'
import Header from './Header'
import { Leaderboard, Options } from './Web3Service'

function App() {
  const [message, setMessage] = useState('')
  const [leaderboard, setLeaderboard] = useState<Leaderboard>()

  function onPlay(option: Options) {
    alert(option)
  }

  return (
    <div className="container">
      <Header />
      <main>
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="/logo512.png"
            alt="JoKenPo"
            width="72"
          />
          <h2>Leaderboard</h2>
          <p className="lead">
            Check the best players&apos; score and play the game.
          </p>
          <p className="lead text-danger">{message}</p>
        </div>
        <div className="col-md-8 col-lg-12">
          <div className="row">
            <div className="col-sm-6"></div>
            <div className="col-sm-6">
              <h4 className="mb-3">Games</h4>
              <div className="card card-body border-0 shadow">
                <h5 className="mb-3 text-primary">Current Status:</h5>
                <div className="alert alert-success">
                  {leaderboard && leaderboard.result
                    ? leaderboard.result
                    : 'Loading...'}
                </div>
                <h5 className="mb-3 text-primary">
                  {(leaderboard && leaderboard.result?.indexOf('won') !== -1) ||
                  !leaderboard?.result
                    ? 'Start a new game:'
                    : 'Play this game:'}
                </h5>
                <div className="d-flex">
                  <div className="col-sm-4">
                    <div
                      className="alert alert-info me-3 play-button"
                      onClick={() => onPlay(Options.PAPER)}
                    >
                      <img src="/assets/paper.png" width={100} alt="Paper" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="alert alert-info play-button"
                      onClick={() => onPlay(Options.ROCK)}
                    >
                      <img src="/assets/rock.png" width={100} alt="Rock" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="alert alert-info ms-3 play-button"
                      onClick={() => onPlay(Options.SCISSORS)}
                    >
                      <img
                        src="/assets/scissors.png"
                        width={100}
                        alt="Scissors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
