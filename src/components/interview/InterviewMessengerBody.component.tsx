import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// dummy
import { questionListPage1 } from "@dummy/question.data";

// lib
import { MessageSide } from "@src/interface/interface";
import MessengerContext from "@src/context/Messenger.context";

// components
import AlertNewMessageComponent from "@src/components/interview/AlertNewMessage.component";
import LoadingDotsComponent from "@src/components/common/LoadingDots.component";

// styles
import styles from "@src/styles/pages/InterviewMessenger.module.scss";

function InterviewMessengerBodyComponent() {
  const {
    bodyRef,
    isMessageLeft,
    displayedList,
    visibleAlertMessage,
    setScrolled,
  } = useContext(MessengerContext);

  const messageListDOM = useMemo(() => {
    const list = displayedList.map((x) => {
      const cn =
        x.side === MessageSide.INTERVIEWER
          ? styles.contentsLeft
          : styles.contentsRight;
      return (
        <div key={x.id} className={cn}>
          {x.contents}
        </div>
      );
    });
    if (isMessageLeft) {
      const s = Symbol("loading").toString();
      list.push(
        <div key={s} className={styles.contentsLeft}>
          <LoadingDotsComponent />
        </div>,
      );
    }
    return list;
  }, [displayedList, isMessageLeft]);

  const lastMessage = useMemo(
    () =>
      displayedList
        .filter((x) => x.side === MessageSide.INTERVIEWER)
        .reverse()[0]?.contents || "",
    [displayedList],
  );

  const trackScrolling = useCallback(() => {
    const element = document.getElementById("messengerBody");
    if (element.scrollTop < 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    if (typeof window !== undefined)
      document
        .getElementById("messengerBody")
        .addEventListener("scroll", trackScrolling);
  }, [trackScrolling]);

  return (
    <div id="messengerBody" className={styles.messenger} ref={bodyRef}>
      <div className={styles.messageWrap}>
        <div className={styles.message}>{messageListDOM}</div>
        {visibleAlertMessage && (
          <AlertNewMessageComponent bodyRef={bodyRef} contents={lastMessage} />
        )}
      </div>
    </div>
  );
}

export default memo(InterviewMessengerBodyComponent);
