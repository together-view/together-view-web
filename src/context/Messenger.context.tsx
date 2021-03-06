import {
  Context,
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";

import { Message, MessageSide, Question } from "@src/interface/interface";

// dummy
import interview1 from "@dummy/interview.data";

// lib
import {
  createNewMessage,
  getIntroMessageList,
  getOutroMessageList,
  getQuestionMessageList,
} from "@src/util/messenger";
import { messageTerm } from "@src/lib/constant/timer.constant";
import useVisible from "@src/hooks/useVisible.hook";
import { useRouter } from "next/router";

interface MessengerProviderProps {
  (props: { children: JSX.Element; questionList: Question[] }): JSX.Element;
}

interface MessengerContextProps {
  bodyRef: MutableRefObject<HTMLInputElement> | null;
  questionIndex: number;
  questionTotal: number;
  allowMessage: boolean;
  visibleAlertMessage: boolean;
  isMessageLeft: boolean;
  interviewFinished: boolean;
  displayedList: Message[];
  showIntroMessage: () => void;
  showOutroMessage: () => void;
  showQuestionMessage: () => void;
  addMessage: (contents: string) => void;
  setScrolled: (flag: boolean) => void;
}

const MessengerContext: Context<MessengerContextProps> = createContext({
  bodyRef: null,
  questionIndex: 0,
  questionTotal: 0,
  allowMessage: false,
  isMessageLeft: true,
  visibleAlertMessage: false,
  interviewFinished: false,
  displayedList: [],
  showIntroMessage: null,
  showOutroMessage: null,
  showQuestionMessage: null,
  addMessage: null,
  setScrolled: null,
});
export const MessengerProvider: MessengerProviderProps =
  function MessengerProvider({ children, questionList }) {
    const bodyRef = useRef<HTMLInputElement>(null);

    const [questionIndex, setQuestionIndex]: [number, Dispatch<number>] =
      useState(0);
    const [displayedList, setDisplayedList]: [Message[], Dispatch<Message[]>] =
      useState([]);
    const [allowMessage, setAllowMessage]: [
      boolean,
      Dispatch<SetStateAction<boolean>>,
    ] = useState(false);
    const [isMessageLeft, setMessageLeft] = useState(true);

    const [introFinished, setIntroFinished] = useState(false);

    const [isScrolled, setScrolled] = useState(false);
    const [checkedMessageIndex, setCheckedMessageIndex] = useState(0);
    const [
      visibleAlertMessage,
      setVisibleAlertMessage,
      setInvisibleAlertMessage,
    ] = useVisible(false);

    const [interviewFinished, setInterviewFinished] = useState(false);

    const showNextMessage = useCallback(
      (nextMessageList, callback) => {
        setMessageLeft(true);
        setAllowMessage(false);
        const tempDisplayList = [...displayedList];

        let i = 0;
        const x = _.debounce(() => {
          tempDisplayList.push(nextMessageList[i]);
          setDisplayedList([...tempDisplayList]);
          i += 1;
          if (i === nextMessageList.length) {
            setMessageLeft(false);
            callback();
          } else {
            x();
          }
        }, messageTerm);
        x();
      },
      [displayedList],
    );

    useEffect(() => {
      if (
        isScrolled &&
        checkedMessageIndex !== displayedList.length - 1 &&
        displayedList[displayedList.length - 1].side === MessageSide.INTERVIEWER
      ) {
        setVisibleAlertMessage();
      } else {
        setInvisibleAlertMessage();
        setCheckedMessageIndex(displayedList.length - 1);
      }
    }, [
      checkedMessageIndex,
      displayedList,
      isScrolled,
      setInvisibleAlertMessage,
      setVisibleAlertMessage,
    ]);

    const showQuestionMessage = useCallback(() => {
      if (questionIndex >= questionList.length) return;

      const isLastQuestion = questionIndex === questionList.length - 1;
      const messages = getQuestionMessageList(
        questionList[questionIndex],
        questionIndex,
        isLastQuestion,
      );
      showNextMessage(messages, () => {
        setAllowMessage(true);
        setQuestionIndex(questionIndex + 1);
      });
    }, [questionIndex, questionList, showNextMessage]);

    const showIntroMessage = useCallback(() => {
      const messages = getIntroMessageList(
        interview1.user,
        interview1.jobList,
        interview1.techList,
      );
      showNextMessage(messages, () => setIntroFinished(true));
    }, [showNextMessage]);

    useEffect(() => {
      if (introFinished) {
        showQuestionMessage();
        setIntroFinished(false);
      }
    }, [introFinished, showQuestionMessage]);

    const showOutroMessage = useCallback(() => {
      const messages = getOutroMessageList();
      showNextMessage(messages, () => {
        // setTimeout(() => router.push(`/interview/result/1`), 3000);
        setInterviewFinished(true);
      });
    }, [showNextMessage]);

    const addMessage = useCallback(
      (contents) => {
        const msg = createNewMessage(
          contents,
          contents,
          MessageSide.INTERVIEWEE,
        );
        setDisplayedList([...displayedList, msg]);
      },
      [displayedList],
    );

    useEffect(() => {
      if (
        displayedList[displayedList.length - 1]?.side ===
        MessageSide.INTERVIEWEE
      )
        bodyRef.current.scrollTo({ behavior: "smooth", top: 0 });
    }, [displayedList]);

    const props: MessengerContextProps = {
      bodyRef,
      questionIndex,
      questionTotal: questionList.length,
      allowMessage,
      isMessageLeft,
      interviewFinished,
      displayedList,
      showIntroMessage,
      showOutroMessage,
      showQuestionMessage,
      addMessage,
      visibleAlertMessage,
      setScrolled,
    };
    return (
      <MessengerContext.Provider value={props}>
        {children}
      </MessengerContext.Provider>
    );
  };

export default MessengerContext;
