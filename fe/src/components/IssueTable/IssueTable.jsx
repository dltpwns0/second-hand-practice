import styled from 'styled-components';
import CheckBox from './CheckBox/CheckBox';
import IssueItem from './IssueItem/IssueItem';
import IssueStatusButtons from './TableToolBar/IssueStatusButtons/IssueStatusButtons';
import TableFilterButtons from './TableToolBar/TableFilterButtons/TableFilterButtons';
import TableToolBar from './TableToolBar/TableToolBar';

const IssueTable = ({ issues, ...rest }) => {
  const issueList = issues.length ? (
    issues.map((issue) => <IssueItem key={issue.number} {...issue} />)
  ) : (
    <NoticeBox>검색과 일치하는 결과가 없습니다.</NoticeBox>
  );

  return (
    <div>
      <TableToolBar>
        <CheckBox />
        <IssueStatusButtons {...rest} />
        <TableFilterButtons />
      </TableToolBar>
      <IssueItemList>{issueList}</IssueItemList>
    </div>
  );
};

export default IssueTable;

const IssueItemList = styled.ul`
  display: flex;
  flex-direction: column;

  height: auto;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 0px 0px 16px 16px;

  li:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;

const NoticeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  color: ${({ theme }) => theme.color.neutralTextWeak};
  background-color: ${({ theme }) => theme.color.neutralBackgroundStrong};
  border-radius: 0px 0px 16px 16px;
`;