import { memo, useMemo } from "react";
import { Button, Switch } from "antd";
import { LikeOutlined } from "@ant-design/icons";

// dummy
import { questionList } from "@dummy/question.data";
import { answerList } from "@dummy/answer.data";

// type
import { Question } from "@src/interface/interface";

// component
import LayoutComponent from "@src/components/common/Layout.component";
import QuestionDetailComponent from "@src/components/question/QuestionDetail.component";
import QuestionAnswerComponent from "@src/components/question/QuestionAnswer.component";
import { QuestionSeo } from "@src/components/seo/Seo.component";

// styles
import styles from "@src/styles/pages/QuestionDetail.module.scss";
import { GetServerSideProps } from "next";

function QuestionDetailPage({ questionId }) {
  const question: Question = useMemo(() => {
    const idToInt = parseInt(questionId, 10);
    return questionList.find((x) => x.id === idToInt);
  }, [questionId]);

  return (
    <LayoutComponent>
      <QuestionSeo question={question} />
      <div className={styles.pageWrap}>
        <section>
          <QuestionDetailComponent question={question} />
          <Button className={styles.likeQuestionButton} type="text">
            이 질문을 추천합니다! <LikeOutlined className={styles.icon} />
          </Button>
        </section>
        <section className={styles.answerInput}>
          <div className={styles.inputArea}>
            <textarea
              className={styles.textArea}
              placeholder="답변을 작성해주세요"
            />
            <Button className={styles.submitButton}>작성</Button>
          </div>
          <div className={styles.confirmShare}>
            <p className={styles.message}>다른 사람에게 답변을 공개할까요?</p>
            <Switch className={styles.switch} />
          </div>
        </section>
        <section>
          <div className={styles.answerList}>
            {answerList.map((x) => (
              <QuestionAnswerComponent key={x.id} answer={x} />
            ))}
          </div>
        </section>
      </div>
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { questionId = "1" } = ctx.query;
  return { props: { questionId } };
};

export default memo(QuestionDetailPage);
