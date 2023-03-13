import dynamic from "next/dynamic";
import { MarkdownPreview } from './MarkdownPreview';
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});
import { useLocalStorageState } from 'ahooks';
import React from 'react';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { useUpdateArticleContentById } from '@/src/hooks/useArticles1';

// Editor.use(Counter);

interface Props {
  markdown: string;
  id: string;
}

export default function MarkdownEditor(props: Props) {
  const mdEditor = React.useRef(null);
  const [message, setMessage] = useLocalStorageState<string | undefined>(
    props.id,
    {
      defaultValue: props.markdown,
    },
  );
  // Editor.use(PublishButton, {id: props.id, content: message , uid: '123456789'});
  const handleEditorChange = ({ html, text }: {html: string, text: string}) => {
    // console.log('handleEditorChange', { html, text })
    // const newValue = text.replace(/\d/g, '');
    setMessage(text);
  };
  const updateArticleContent = useUpdateArticleContentById();
  const handleClick = () => {
    updateArticleContent.mutate({id: props.id, content: message as string, uid: '123456'})
  };

  return (
    <>
      <MdEditor
        // ref={mdEditor}
        value={message}
        className=""
        style={{ height: '700px' }}
        onChange={handleEditorChange}
        renderHTML={(text) =><MarkdownPreview markdown={text || ''} />}
        // renderHTML={(text) => <div className='prose max-w-none'><MarkdownPreview markdown={text || ''} /></div>}
      />
      <button
        className="btn-primary space-x-3 mt-3"
        onClick={() => handleClick()}
      >
        <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
        <p className="hidden sm:block">Publish</p>
      </button>
    </>
  );
}
