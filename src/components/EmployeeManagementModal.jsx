import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { Image02Icon, Upload01Icon, UserSquareIcon } from '@hugeicons/core-free-icons/index';

export function EmployeeManagementModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent closeOnClickOutside={false} className="max-w-[90vw]! h-[90vh] flex flex-col p-0 w-200 gap-0">
        <DialogHeader className="p-4 border-b gap-0">
          <DialogTitle>Quản lý Nhân viên</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Quản lý danh sách nhân viên, hình ảnh và nhập dữ liệu từ tệp
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col p-4 pt-0">
          <TabsList className="flex bg-transparent h-auto p-0 w-auto justify-start gap-2 mb-0">
            <TabsTrigger value="employees" className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-2 px-1! text-xs">
              <span>Danh sách</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-2 px-1! text-xs">
              <span>Hình ảnh</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-2 px-1! text-xs">
              <span>Nhập dữ liệu</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Danh sách Nhân viên */}
          <TabsContent value="employees" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto border rounded-md p-4 bg-background">
              <div className="text-center text-muted-foreground py-8">
                <p>Chưa có nhân viên nào</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="default" className="flex-1">
                Thêm nhân viên
              </Button>
              <Button variant="outline" className="flex-1">
                Xóa
              </Button>
            </div>
          </TabsContent>

          {/* Tab: Hình ảnh Nhân viên */}
          <TabsContent value="images" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto border rounded-md p-4 bg-background">
              <div className="text-center text-muted-foreground py-8">
                <p>Chưa có hình ảnh nào</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <input
                type="file"
                multiple
                accept="image/*"
                id="image-input"
                className="hidden"
              />
              <Button
                variant="default"
                className="flex-1"
                onClick={() => document.getElementById('image-input').click()}
              >
                Chọn hình ảnh
              </Button>
              <Button variant="outline" className="flex-1">
                Xóa
              </Button>
            </div>
          </TabsContent>

          {/* Tab: Nhập dữ liệu */}
          <TabsContent value="import" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto space-y-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nhập tệp Excel (.xlsx)</label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  id="excel-input"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('excel-input').click()}
                >
                  <HugeiconsIcon icon={Upload01Icon} className="w-4 h-4 mr-2" />
                  Chọn tệp Excel
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Nhập hình ảnh nhân viên</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="bulk-image-input"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('bulk-image-input').click()}
                >
                    <HugeiconsIcon icon={Upload01Icon} className="w-4 h-4 mr-2" />
                  Chọn hình ảnh (nhiều tệp)
                </Button>
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground">
                  <strong>Hướng dẫn:</strong> Tệp Excel phải chứa cột ID để ghép ảnh với nhân viên
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="default" className="flex-1">
                Xử lý dữ liệu
              </Button>
              <Button variant="outline" className="flex-1">
                Hủy bỏ
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
