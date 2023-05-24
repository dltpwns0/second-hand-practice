import { useEffect, useState } from 'react';
import { ALL, CLOSED, OPENED } from '../constants';
import TabBar from '../components/TabBar/TabBar';
import IssueTable from '../components/IssueTable/IssueTable';

const IssueList = () => {
  // TODO: 전체 내용 MainPage로 빼고 App은 라우터 설정
  // TODO: 상태관리 useReducer 사용 예정
  const [issues, setIssues] = useState([]);
  const [counts, setCounts] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    state: OPENED,
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
  // TODO: FilterInput의 helper랑 통합가능하면 하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueState = filterOptions.state;
        let queryString;
        if (issueState === ALL) {
          queryString = '';
        } else if (issueState === OPENED) {
          queryString = '?state=true';
        } else if (issueState === CLOSED) {
          queryString = '?state=false';
        }

        const url = `http://3.38.73.117:8080/api-fe/issues${queryString}`;
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
    <>
      <TabBar
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <IssueTable
        issues={issues}
        counts={counts}
        issueState={filterOptions.state}
        setFilterOptions={setFilterOptions}
      />
    </>
  );
};

export default IssueList;