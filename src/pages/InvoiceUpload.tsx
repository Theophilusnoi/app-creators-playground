import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';

const InvoiceUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, JPG, or PNG file.",
        variant: "destructive",
      });
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(uploadInterval);
          setUploadStatus('processing');
          processInvoice(file);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
  };

  const processInvoice = async (file: File) => {
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock extracted data
      const mockData = {
        vendor: "ABC Supplies Inc.",
        date: "2024-01-15",
        amount: 1234.56,
        tax: 98.77,
        description: "Office supplies and equipment",
        category: "Office Expenses"
      };

      setExtractedData(mockData);
      setUploadStatus('success');
      setUploadProgress(100);
      
      toast({
        title: "Invoice processed successfully",
        description: "Data has been extracted and is ready for review.",
      });
    } catch (error) {
      setUploadStatus('error');
      toast({
        title: "Processing failed",
        description: "Failed to extract data from the invoice. Please try again.",
        variant: "destructive",
      });
    }
  };

  const confirmAndSave = () => {
    // Here we would send data to N8N webhook
    toast({
      title: "Invoice saved",
      description: "Invoice data has been added to your accounting records.",
    });
    
    // Reset form
    setUploadStatus('idle');
    setExtractedData(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Invoice Upload</h1>
          <p className="text-muted-foreground">Upload and process invoices with AI-powered OCR</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Invoice</CardTitle>
              <CardDescription>Drag and drop or click to upload PDF, JPG, or PNG files</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                } ${uploadStatus === 'idle' ? 'hover:border-primary/50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadStatus === 'idle' && (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your invoice here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <Button 
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      Choose File
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </>
                )}

                {uploadStatus === 'uploading' && (
                  <div className="space-y-4">
                    <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                    <p className="text-lg font-medium">Uploading...</p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                  </div>
                )}

                {uploadStatus === 'processing' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <FileText className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-lg font-medium">Processing with AI...</p>
                    <p className="text-sm text-muted-foreground">Extracting data from your invoice</p>
                  </div>
                )}

                {uploadStatus === 'success' && (
                  <div className="space-y-4">
                    <Check className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="text-lg font-medium text-green-600">Processing Complete!</p>
                    <Badge variant="secondary">Ready for Review</Badge>
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="space-y-4">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                    <p className="text-lg font-medium text-destructive">Processing Failed</p>
                    <Button onClick={() => setUploadStatus('idle')}>
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
              <CardDescription>Review and edit the extracted information</CardDescription>
            </CardHeader>
            <CardContent>
              {extractedData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor">Vendor</Label>
                      <Input id="vendor" defaultValue={extractedData.vendor} />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" defaultValue={extractedData.date} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" step="0.01" defaultValue={extractedData.amount} />
                    </div>
                    <div>
                      <Label htmlFor="tax">Tax</Label>
                      <Input id="tax" type="number" step="0.01" defaultValue={extractedData.tax} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" defaultValue={extractedData.description} />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" defaultValue={extractedData.category} />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={confirmAndSave} className="flex-1">
                      Confirm & Save
                    </Button>
                    <Button variant="outline" onClick={() => setExtractedData(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload an invoice to see extracted data here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUpload;