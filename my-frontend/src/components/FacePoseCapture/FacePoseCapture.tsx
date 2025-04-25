import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import styles from './FacePoseCapture.module.css';

import { toast }     from 'react-toastify';

export type Pose = 'front' | 'left' | 'right';

interface Props {
  onComplete: (captures: { pose: Pose; base64: string }[]) => void;
}

const poses: Pose[] = ['front', 'left', 'right'];

const FacePoseCapture = ({ onComplete }: Props) => {
  const camRef         = useRef<Webcam>(null);
  const [step, setStep] = useState(0);           // index pose hiện tại
  const [count, setCnt] = useState(0);           // 2‑>1‑>0 để freeze
  const [shots, setShots] = useState<{pose: Pose; base64: string}[]>([]);

  /** đếm 2s rồi chụp */
  useEffect(() => {
    if (count === 0) return;
    const id = setTimeout(() => setCnt(c => c-1), 1000);
    return () => clearTimeout(id);
  }, [count]);

  /** khi countdown = 0 => tự chụp */
  useEffect(() => {
    if (count === 0 && step < poses.length && step === shots.length) {
      const img = camRef.current?.getScreenshot();
      if (img) {
        setShots([...shots, { pose: poses[step], base64: img }]);
        toast.info(`Đã lưu pose ${poses[step]}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  /** tiến tới pose tiếp theo khi vừa chụp xong */
  useEffect(() => {
    if (shots.length && shots.length - 1 === step) {
      if (step + 1 < poses.length) setStep(step + 1);
    }
    if (shots.length === poses.length) onComplete(shots);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shots]);

  /** bắt đầu countdown */
  const handleStart = () => setCnt(2);

  return (
    <div className={styles.block}>
      <Webcam
        ref={camRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className={styles.cam}
        mirrored
      />
      <p className={styles.guide}>
        {count ? `Giữ nguyên (${count})` :
         shots.length === poses.length
           ? 'Đã xong tất cả poses'
           : `Bước ${step+1}/3 – quay ${poses[step] === 'front' ? 'thẳng' : poses[step] === 'left' ? 'sang trái' : 'sang phải'}`
        }
      </p>
      {shots.length < poses.length &&
        <button className={styles.shotBtn} onClick={handleStart}>
          {count ? '...' : 'Chụp'}
        </button>}
    </div>
  );
};

export default FacePoseCapture;
