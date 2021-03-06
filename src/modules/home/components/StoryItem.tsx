import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'tailwind.macro';
import { format } from 'date-fns';
import { ButtonOutline } from '../../../components';
import { SubsetStory } from '../../../types';

const StoryContainer = styled.div`
  ${tw`py-8 border-b border-solid border-grey-light`};
`;

const StoryTitleContainer = styled.div`
  ${tw`flex justify-between`};
`;

const StoryTitle = styled.div<{ to: string }>`
  ${tw`text-2xl font-bold no-underline text-black`};
`;

const StoryDate = styled.div`
  ${tw`text-sm italic text-grey-dark`};
`;

const StoryText = styled.div`
  ${tw`mt-4 text-grey-dark`};
`;

interface Props {
  story: SubsetStory;
  type: 'public' | 'private';
  loading: boolean;
  onPublish: () => void;
  onUnPublish: () => void;
}

export const StoryItem = ({
  story,
  type,
  loading,
  onPublish,
  onUnPublish,
}: Props) => {
  return (
    <StoryContainer>
      <StoryTitleContainer>
        <StoryTitle as={Link} to={`/stories/${story.id}`}>
          {story.title}
        </StoryTitle>
        <div>
          {loading && (
            <ButtonOutline style={{ marginRight: 8 }} disabled={true}>
              Loading ...
            </ButtonOutline>
          )}
          {!loading && type === 'private' && (
            <ButtonOutline style={{ marginRight: 8 }} onClick={onPublish}>
              Publish
            </ButtonOutline>
          )}
          {!loading && type === 'public' && (
            <ButtonOutline style={{ marginRight: 8 }} onClick={onUnPublish}>
              Unpublish
            </ButtonOutline>
          )}
          <ButtonOutline as={Link} to={`/stories/${story.id}`}>
            Edit
          </ButtonOutline>
        </div>
      </StoryTitleContainer>

      <StoryDate>{format(story.createdAt, 'HH:mm DD MMMM YYYY')}</StoryDate>
      <StoryText>{story.content}</StoryText>
    </StoryContainer>
  );
};
