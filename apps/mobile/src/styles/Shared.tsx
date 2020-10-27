import styled from "styled-components";

export const Line = styled.button`
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--sub);
  border-bottom: 1px solid var(--border);
`;

export const Card = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: solid 1px var(--border);
  background-color: var(--bg-mid);
  box-shadow: var(--shadow);
`;

type SeletedTagProps = {
  includeMargin: boolean;
};

export const SelectedTag = styled.button`
  padding: 5px 8px;
  border-radius: 12px;
  background-color: var(--primary-light);
  font-size: 12px;
  margin: ${(props: SeletedTagProps) => {
    return props.includeMargin ? "0 5px 5px 0" : "0;";
  }};
  color: var(--primary);
  display: inline-block;
  text-overflow: ellipsis;
  height: 24px;
`;

export const SelectedTags = styled.div`
  width: 100%;
  border: solid 1px var(--border);
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 10px;
  min-height: 41px;
  background-color: var(--bg-top);
  max-height: 200px;
  overflow: auto;
`;
