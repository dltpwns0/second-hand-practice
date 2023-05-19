import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { PageLayout } from './components/common';
import GlobalStyles from './style/GlobalStyles';
import IssueTable from './components/IssueTable/IssueTable';
import { darkTheme, lightTheme } from './style';
import TabBar from './components/TabBar/TabBar';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  // TODO: 전체 내용 MainPage로 빼고 App은 라우터 설정
  // TODO: 상태관리 useReducer 사용 예정
  const [issues, setIssues] = useState([]);
  const [counts, setCounts] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    isOpened: true,
    // writtenByMe: false,
    // assignedToMe: false,
    // commentedByMe: false,
    // assignee: null,
    // labels: [],
    // milestone: null,
    // author: null,
  });

  // TODO: dot env 로 빼기
  // TODO: 각각의 filter 옵션에 대해서 분기처리 필요
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://3.38.73.117:8080/api-fe/issues${
          !filterOptions.isOpened ? '?state=false' : ''
        }`;
        const response = await fetch(url);
        const data = await response.json();
        setIssues(data.issues);
        setCounts(data.counts);
      } catch (error) {
        // TODO: 오류 처리
      }
    };

    fetchData();
  }, [filterOptions]);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            setTheme(theme.id === 'lightTheme' ? darkTheme : lightTheme);
          },
        }}
      >
        <PageLayout>
          <TabBar filterOptions={filterOptions} />
          <IssueTable
            issues={issues}
            counts={counts}
            isOpened={filterOptions.isOpened}
            setFilterOptions={setFilterOptions}
          />
        </PageLayout>
      </ThemeProvider>
    </div>
  );
};

export default App;
