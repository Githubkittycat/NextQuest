import React from 'react';
import { XIcon } from './Icons';
import type { NewsArticle } from '../types';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ article, onClose }) => {
  if (!article) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-content-bg rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 relative border-b border-gray-700 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-subtle-text hover:text-light-text">
            <XIcon className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold pr-8">{article.title}</h2>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-light-text whitespace-pre-wrap leading-relaxed">{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;