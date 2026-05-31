import Icon from '@/components/common/icon';
import IconButton from '@/components/ui/icon-button';

type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  if (pages <= 1) return null;

  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="sticky bottom-0 mt-auto flex items-center justify-center gap-16 bg-gray-50/80 py-16 backdrop-blur-md">
      <IconButton
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, prevPage))}
      >
        <Icon name="icon-[basil--caret-right-solid]" className="size-24" />
      </IconButton>

      <span className="text-body-sm-500 text-gray-600">
        صفحه {page} از {pages}
      </span>

      <IconButton
        variant="secondary"
        disabled={page === pages}
        onClick={() => onPageChange(Math.min(pages, nextPage))}
      >
        <Icon name="icon-[basil--caret-left-solid]" className="size-24" />
      </IconButton>
    </div>
  );
};

export default Pagination;
