import { memo } from "react";
import Link from "next/link";

// dummy
import { myAccount } from "@dummy/user.data";

// styles
import BannerComponent from "@src/components/banner/Banner.component";

import styles from "@src/styles/components/Banner.module.scss";

function InterviewStartBannerComponent({
  color,
  imgSrc = "/static/illustrations/interview.png",
}) {
  return (
    <div className={styles.bannerWrap}>
      <Link href="/interview">
        <a>
          <BannerComponent
            title="면접 시작하기"
            description={`${myAccount.firstName}님을 위해 준비된 면접에 참여해보세요!`}
            color={color}
            imgSrc={imgSrc}
          />
        </a>
      </Link>
    </div>
  );
}

export default memo(InterviewStartBannerComponent);
