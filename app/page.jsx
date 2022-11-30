import styles from './page.module.css';
import Image from 'next/image';
import archPic from '.././public/arch.ico';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import LoginBtn from './LoginBtn';

//home page component
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>National Parks Digital Passport</h1>
      <Image src={archPic} alt='icon showing Delicate Arch in Moab' width={250} height={250} />
      <SignupModal />
      <br />
      {/* <LoginModal /> */}
      <LoginBtn>
        {/* <dashBoard /> */}
      </LoginBtn>
    </div>
  );
}
