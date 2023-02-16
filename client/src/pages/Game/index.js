import { BackspaceIcon } from "../../icons";
import * as GameComponent from "../../gameStyledComponents";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { WORDS } from "../../utils/words";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const allKeys = keyboardRows.flat();

const wordLength = 5;

const newGame = {
  0: Array.from({ length: wordLength }).fill(""),
  1: Array.from({ length: wordLength }).fill(""),
  2: Array.from({ length: wordLength }).fill(""),
  3: Array.from({ length: wordLength }).fill(""),
  4: Array.from({ length: wordLength }).fill(""),
  5: Array.from({ length: wordLength }).fill(""),
};

const fetchWord = (word) => {
  return WORDS.includes(word)
};

function Game() {
  const wordOfTheDay = "money";

  const { loading, error, data } = useQuery(QUERY_ME)

  const [guesses, setGuesses] = useState({ ...newGame });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: wordLength }).fill(""),
    1: Array.from({ length: wordLength }).fill(""),
    2: Array.from({ length: wordLength }).fill(""),
    3: Array.from({ length: wordLength }).fill(""),
    4: Array.from({ length: wordLength }).fill(""),
    5: Array.from({ length: wordLength }).fill(""),
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isShared, setIsShared] = useState(false);

  let letterIndex = useRef(0);
  let round = useRef(0);

  const win = () => {
    document.removeEventListener("keydown", handleKeyDown);
    setModalVisible(true);
  };

  const submit = () => {
    const _round = round.current;

    const updatedMarkers = {
      ...markers,
    };

    const tempWord = wordOfTheDay.split("");

    const leftoverIndices = [];

    // Prioritize the letters in the correct spot
    tempWord.forEach((letter, index) => {
      const guessedLetter = guesses[_round][index];

      if (guessedLetter === letter) {
        updatedMarkers[_round][index] = "green";
        tempWord[index] = "";
      } else {
        // We will use this to mark other letters for hints
        leftoverIndices.push(index);
      }
    });

    if (updatedMarkers[_round].every((guess) => guess === "green")) {
      setMarkers(updatedMarkers);
      win();
      return;
    }

    // Then find the letters in wrong spots
    if (leftoverIndices.length) {
      leftoverIndices.forEach((index) => {
        const guessedLetter = guesses[_round][index];
        const correctPositionOfLetter = tempWord.indexOf(guessedLetter);

        if (
          tempWord.includes(guessedLetter) &&
          correctPositionOfLetter !== index
        ) {
          // Mark yellow when letter is in the word of the day but in the wrong spot
          updatedMarkers[_round][index] = "yellow";
          tempWord[correctPositionOfLetter] = "";
        } else {
          // This means the letter is not in the word of the day.
          updatedMarkers[_round][index] = "grey";
        }
      });
    }

    setMarkers(updatedMarkers);
    round.current = _round + 1;
    letterIndex.current = 0;
  };

  const erase = () => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex !== 0) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = "";
        return newGuesses;
      });

      letterIndex.current = _letterIndex - 1;
    }
  };

  const publish = (pressedKey) => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex < wordLength) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex] = pressedKey.toLowerCase();
        return newGuesses;
      });

      letterIndex.current = _letterIndex + 1;
    }
  };

  const enterGuess = async (pressedKey) => {
    if (pressedKey === "enter" && !guesses[round.current].includes("")) {

      if (fetchWord(guesses[round.current].join(""))) {
        submit();
      }
    } else if (pressedKey === "backspace") {
      erase();
    } else if (pressedKey !== "enter") {
      publish(pressedKey);
    }
  };

  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();
    enterGuess(pressedKey);
  };

  const copyMarkers = () => {
    let shareText = `Wordle`;
    let shareGuesses = "";

    const amountOfGuesses = Object.entries(markers)
      .filter(([_, guesses]) => !guesses.includes(""))
      .map((round) => {
        const [_, guesses] = round;

        guesses.forEach((guess) => {
          if (guess === "green") {
            shareGuesses += "🟩";
          } else if (guess === "yellow") {
            shareGuesses += "🟨";
          } else {
            shareGuesses += "⬛️";
          }
        });

        shareGuesses += "\n";

        return "";
      });

    shareText += ` ${amountOfGuesses.length}/6\n${shareGuesses}`;

    navigator.clipboard.writeText(shareText);
    setIsShared(true);
  };

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();

    if (allKeys.includes(pressedKey)) {
      enterGuess(pressedKey);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#share");

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <GameComponent.Main>
        <GameComponent.Header>WORDLE</GameComponent.Header>
        <GameComponent.GameSection>
          <GameComponent.TileContainer>
            {Object.values(guesses).map((word, wordIndex) => (
              <GameComponent.TileRow key={wordIndex}>
                {word.map((letter, i) => (
                  <GameComponent.Tile key={i} hint={markers[wordIndex][i]}>
                    {letter}
                  </GameComponent.Tile>
                ))}
              </GameComponent.TileRow>
            ))}
          </GameComponent.TileContainer>
        </GameComponent.GameSection>
        <GameComponent.KeyboardSection>
          {keyboardRows.map((keys, i) => (
            <GameComponent.KeyboardRow key={i}>
              {i === 1 && <GameComponent.Flex item={0.5} />}
              {keys.map((key) => (
                <GameComponent.KeyboardButton
                  key={key}
                  onClick={() => handleClick(key)}
                  flex={["enter", "backspace"].includes(key) ? 1.5 : 1}
                >
                  {key === "backspace" ? <BackspaceIcon /> : key}
                </GameComponent.KeyboardButton>
              ))}
              {i === 1 && <GameComponent.Flex item={0.5} />}
            </GameComponent.KeyboardRow>
          ))}
        </GameComponent.KeyboardSection>
      </GameComponent.Main>
      <div id="share">
        <Modal
          isOpen={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Share"
        >
          <GameComponent.ShareModal>
            <GameComponent.Heading>You win!</GameComponent.Heading>
            <GameComponent.Row>
              <h3>Share</h3>
              <GameComponent.ShareButton onClick={copyMarkers} disabled={isShared}>
                {isShared ? "Copied!" : "Share"}
              </GameComponent.ShareButton>
            </GameComponent.Row>
          </GameComponent.ShareModal>
        </Modal>
      </div>
    </>
  );
}

export default Game;