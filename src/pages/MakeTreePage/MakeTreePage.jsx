import { createContext, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderTitle from '@/components/HeaderTitle/HeaderTitle';
import UsageDescription from '@/components/UsageDescription/UsageDescription';
import blossomTree from '@/assets/main-page/main-tree.png';
import BackgroundCustomList from '@/components/BackgroundCustomList/BackgroundCustomList';
import ShortButtonList from '@/components/ShortButtonList/ShortButtonList';
import OriginTree from '@/components/OriginTree/OriginTree';

import classNames from 'classnames';
import style from './MakeTreePage.module.scss';
import headerStyle from '@/components/Header/Header.module.scss';
import selectPink from '@/assets/custom/select-bg-pink.png';
import selectNight from '@/assets/custom/select-bg-night.png';
import selectSky from '@/assets/custom/select-bg-sky.png';
import bgPink from '@/assets/custom/bg-pink.png';
import bgNight from '@/assets/custom/bg-night.png';
import bgSky from '@/assets/custom/bg-sky.png';

import { useUpdateData } from '@/firebase/firestore/useUpdateData';
import { useCallCollection } from '@/firebase/app';

const backgroundImageList = [
  {
    id: 1,
    bigSrc: bgSky,
    isSelected: false,
    smallSrc: selectSky,
  },
  {
    id: 2,
    bigSrc: bgNight,
    isSelected: false,
    smallSrc: selectNight,
  },
  {
    id: 3,
    bigSrc: bgPink,
    isSelected: false,
    smallSrc: selectPink,
  },
];

const flowerList = [
  {
    id:0,
    nickName:'사람1',
    contents: '하이1'
  },
  {
    id:1,
    nickName:'사람2',
    contents: '하이2'
  },
  {
    id:2,
    nickName:'사람3',
    contents: '하이3'
  },
  {
    id:3,
    nickName:'사람4',
    contents: '하이4'
  },
  {
    id:4,
    nickName:'사람5',
    contents: '하이5'
  },
  {
    id:5,
    nickName:'사람6',
    contents: '하이6'
  },
  {
    id:6,
    nickName:'사람7',
    contents: '하이7'
  },
  {
    id:7,
    nickName:'사람8',
    contents: '하이8'
  },
  {
    id:8,
    nickName:'사람9',
    contents: '하이9'
  },
];

export const BgContext = createContext();

const MakeTreePage = () => {
  const navigate = useNavigate();

  const { updateData } = useUpdateData('users');

  const [nickname, setNickname] = useState('');
  const [selectBg, setSelectBg] = useState(
    JSON.stringify('/src/assets/custom/bg-pink.png')
  );

  const localUid = JSON.parse(localStorage.getItem('uid'));

  // 배경색 선택 이벤트
  const handleSelect = (e) => {
    const backgoundImage = document.querySelector('.MakeTreePage');
    const buttonElement = e.target.closest('button');

    backgroundImageList.map((item) => {
      if (parseInt(buttonElement.id) === item.id) {
        backgoundImage.style = `background :url(${item.bigSrc}) center no-repeat`;
        setSelectBg(item.bigSrc);
        return;
      }
    });
  };

  // 완료 버튼 클릭 이벤트
  const handleComplete = async () => {
    updateData(localUid, {
      bgSrc: selectBg,
      isMade: true,
      url: `https://localhost:3000/share-tree/${localUid}`,
      userNickname: nickname,
      // flowerList:flowerList

    });

    navigate(`/share-tree/${localUid}`, { replace: true });

    // 뒤로 가기 막기 코드
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
  };

  const value = {
    backgroundImageList,
    setSelectBg,
    handleSelect,
  };

  useLayoutEffect(() => {
    useCallCollection().then((userList) => {
      userList.map((user) => {
        if (user.uid === localUid && user.isMade) {
          navigate(`/share-tree/${localUid}`);
        }
      });
    });
  }, []);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <BgContext.Provider value={value}>
      <div className={classNames('MakeTreePage', style.makeTreeContainer)}>
        <header className={headerStyle.header}>
          <UsageDescription subText={'벚꽃나무에 이름을 적어주세요'} />
          <div className={style.headerTitle}>
            <input
              type="text"
              name="userNickname"
              value={nickname}
              maxLength={10}
              placeholder="닉네임을 입력해주세요"
              onChange={handleChange}
              className={style.userNickname}
            />
            <span>님의 벚꽃나무</span>
          </div>
        </header>
        <OriginTree className={style.originTree} />
        <div className={style.makeTreeCustom}>
          <UsageDescription
            className={style.makeTreeCustomText}
            subText={'벚꽃나무의 하늘을 선택해주세요.'}
          />
          <BackgroundCustomList />
          <ShortButtonList
            firstText={'취소'}
            firstClick={() => navigate('/')}
            secondText={'완료'}
            secondClick={handleComplete}
          />
        </div>
      </div>
    </BgContext.Provider>
  );
};

export default MakeTreePage;
